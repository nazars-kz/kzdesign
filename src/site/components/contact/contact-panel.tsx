'use client';

/**
 * The contact panel: tabs "Book a call" (day → time → details → sent) and "Send a message".
 * One component for the slide-in drawer (every "Get in touch" button) and for the embedded
 * block of the Home page. The forms go through the site's form engine (`useSiteForm`):
 * `booking` for calls, `project` (drawer) or `contact` (embedded) for messages.
 */
import Image from 'next/image';
import {
  type FormEvent,
  type ReactNode,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import type { ResolvedImage } from '@/core/content/define';
import type { SiteFormConfig } from '@/core/forms/config';
import { type FormMessages, useSiteForm } from '@/core/forms/use-site-form';

import { ButtonArrow } from '../ui/button-arrow';
import { buttonClasses } from '../ui/button-styles';
import { cx } from '../ui/cn';
import { Field, Input, Textarea } from '../ui/field';
import {
  firstOpenDay,
  formatDay,
  formatTime,
  gmtLabel,
  isDayOpen,
  lastBookableDay,
  officeToday,
  type Slot,
  SLOT_MINUTES,
  slotsFor,
  visitorTimeZone,
} from './booking-time';
import type { PanelStringKey, PanelStrings } from './panel-strings';

export type PanelTab = 'book' | 'message';

export interface PanelForm {
  readonly config: SiteFormConfig;
  readonly messages: FormMessages;
  /** `<FormSecurityFields>` rendered on the server. */
  readonly security: ReactNode;
}

export interface PanelPerson {
  readonly name: string;
  readonly role: string;
  readonly photo: ResolvedImage | null;
}

export interface ContactPanelProps {
  mode: 'drawer' | 'inline';
  tab: PanelTab;
  onTabChange: (tab: PanelTab) => void;
  onClose?: () => void;
  /** Message tab: the full project request (drawer) or the simple contact form (embedded). */
  messageForm: PanelForm;
  bookingForm: PanelForm;
  /** Interface texts of the panel (`contact` namespace) and of forms (`forms`). */
  strings: PanelStrings;
  formStrings: { summaryTitle: string; required: string; sending: string };
  person: PanelPerson;
  /** Lead text of the booking step. */
  lead: string;
  email: string;
  /** Rich consent text (drawer message form). */
  consent: ReactNode;
}

const NEEDS = 7;
const BUDGETS = 5;
const SOURCES = 7;
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

/* ── Icons ─────────────────────────────────────────────────────────────── */

function Svg({
  children,
  fill = 'none',
  width = 2,
}: {
  children: ReactNode;
  fill?: string;
  width?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
const IconClose = () => (
  <Svg>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);
const IconLeft = () => (
  <Svg>
    <path d="M15 18l-6-6 6-6" />
  </Svg>
);
const IconRight = () => (
  <Svg>
    <path d="M9 18l6-6-6-6" />
  </Svg>
);
const IconPlus = () => (
  <Svg width={2.4}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
const IconCheck = ({ width = 3 }: { width?: number }) => (
  <Svg width={width}>
    <path d="M20 6L9 17l-5-5" />
  </Svg>
);
const IconClock = () => (
  <Svg>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);
const IconVideo = () => (
  <Svg>
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="M16 10l5-3v10l-5-3z" />
  </Svg>
);
const IconCalendar = () => (
  <Svg>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Svg>
);
const IconMail = () => (
  <Svg width={1.8}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
  </Svg>
);
const IconSpark = () => (
  <Svg fill="currentColor" width={0}>
    <path d="M10 2.5l1.9 5.6 5.6 1.9-5.6 1.9L10 17.5l-1.9-5.6L2.5 10l5.6-1.9zM18.5 13l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" />
  </Svg>
);
const IconGlobe = () => (
  <Svg>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9s1.3-6.3 3.8-9z" />
  </Svg>
);

/* ── Panel ─────────────────────────────────────────────────────────────── */

export function ContactPanel(props: ContactPanelProps) {
  const { mode, tab, onTabChange, onClose, strings: s } = props;
  const tabs: PanelTab[] = mode === 'inline' ? ['message', 'book'] : ['book', 'message'];
  const label = (name: PanelTab) => (name === 'book' ? s.tabBook : s.tabMessage);
  // "Make another submission" starts a pane over: a new key remounts its form state
  const [resets, setResets] = useState({ book: 0, message: 0 });
  const reset = (pane: PanelTab) => setResets((now) => ({ ...now, [pane]: now[pane] + 1 }));

  const onTabKeys = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const next = tab === 'book' ? 'message' : 'book';
    onTabChange(next);
    requestAnimationFrame(() =>
      document.getElementById(`dw-tab-${mode}-${next}`)?.focus({ preventScroll: true }),
    );
  };

  return (
    <div
      className="dw__panel"
      {...(mode === 'drawer'
        ? { role: 'dialog', 'aria-modal': true, tabIndex: -1, 'aria-label': s.panelLabel }
        : { 'aria-label': s.inlineLabel })}
    >
      <div className="dw__top">
        <div className="dw__tabs" role="tablist" onKeyDown={onTabKeys}>
          {tabs.map((name) => (
            <button
              key={name}
              id={`dw-tab-${mode}-${name}`}
              className="dw__tab"
              type="button"
              role="tab"
              aria-selected={tab === name}
              tabIndex={tab === name ? 0 : -1}
              onClick={() => onTabChange(name)}
            >
              {label(name)}
            </button>
          ))}
        </div>
        {mode === 'drawer' ? (
          <button className="dw__close" type="button" aria-label={s.close} onClick={onClose}>
            <IconClose />
          </button>
        ) : null}
      </div>
      <div className={cx('dw__pane', tab === 'book' && 'is-active')} role="tabpanel">
        <BookPane key={`book-${resets.book}`} {...props} onAgain={() => reset('book')} />
      </div>
      <div className={cx('dw__pane', tab === 'message' && 'is-active')} role="tabpanel">
        <MessagePane
          key={`message-${resets.message}`}
          {...props}
          onAgain={() => reset('message')}
        />
      </div>
    </div>
  );
}

/* ── Shared bits ───────────────────────────────────────────────────────── */

/** "Sent" step: title and text of the form, and the button that starts over. */
function DoneStep({
  title,
  text,
  again,
  onAgain,
  active,
}: {
  title: string;
  text: string;
  again: string;
  onAgain: () => void;
  active: boolean;
}) {
  return (
    <div className={cx('dw__step', active && 'is-active')}>
      <div className="dw-done" role="status">
        <span className="dw-done__icon">
          <IconCheck />
        </span>
        <h2 className="dw-title">{title}</h2>
        <p className="dw-lead">{text}</p>
        <button type="button" className={buttonClasses('light', 'btn--accent')} onClick={onAgain}>
          {again}
        </button>
      </div>
    </div>
  );
}

/** Error summary and form-level notice (rate limit, errors) of a form. */
function FormFeedback({
  form,
  summaryRef,
  title,
}: {
  form: ReturnType<typeof useSiteForm>;
  summaryRef: React.RefObject<HTMLDivElement | null>;
  title: string;
}) {
  return (
    <>
      {form.summary.length > 0 ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="form__summary">
          <p className="text-label">{title}</p>
          <ul>
            {form.summary.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  {item.label}: {item.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {form.notice ? (
        <p role="alert" className="form__notice text-body-sm">
          {form.notice.text}
        </p>
      ) : null}
    </>
  );
}

/** Submit stays disabled while the required fields are not valid (checked natively). */
function useReady(): {
  ready: boolean;
  check: (event: FormEvent<HTMLFormElement>) => void;
} {
  const [ready, setReady] = useState(false);
  return { ready, check: (event) => setReady(event.currentTarget.checkValidity()) };
}

function isHydrated(form: ReturnType<typeof useSiteForm>): boolean {
  return 'noValidate' in form.formProps;
}

/* ── Book a call ───────────────────────────────────────────────────────── */

function subscribeNever(): () => void {
  return () => undefined;
}

interface BrowserClock {
  readonly today: Date;
  readonly last: Date;
  readonly first: Date | null;
  readonly tz: string;
}
let clockSnapshot: BrowserClock | null = null;
/** Stable client-only snapshot (null on the server, so the markup matches on hydration). */
function browserClock(): BrowserClock {
  if (!clockSnapshot) {
    const today = officeToday();
    const last = lastBookableDay(today);
    clockSnapshot = { today, last, first: firstOpenDay(today, last), tz: visitorTimeZone() };
  }
  return clockSnapshot;
}

function BookPane({
  bookingForm,
  strings: s,
  formStrings,
  person,
  lead,
  onAgain,
}: ContactPanelProps & { onAgain: () => void }) {
  const summaryRef = useRef<HTMLDivElement>(null);
  const form = useSiteForm({
    config: bookingForm.config,
    messages: bookingForm.messages,
    summaryRef,
  });
  const { ready, check } = useReady();
  // The calendar depends on "now" and the visitor's zone: it exists in the browser only.
  const clock = useSyncExternalStore(subscribeNever, browserClock, () => null);
  const [dayPick, setDayPick] = useState<Date | null | undefined>(undefined);
  const [viewPick, setViewPick] = useState<Date | undefined>(undefined);
  const [slot, setSlot] = useState<Date | null>(null);
  const [hour24, setHour24] = useState(true);
  const [step, setStep] = useState<'pick' | 'details'>('pick');
  const [sentTo, setSentTo] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const goStep = (next: 'pick' | 'details') => {
    setStep(next);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  if (!clock) return <div className="dw__step is-active" aria-hidden="true" />;
  const { today, last, tz } = clock;
  // The first open day is preselected until the visitor picks another.
  const day = dayPick === undefined ? clock.first : dayPick;
  const view = viewPick ?? new Date((day ?? today).getFullYear(), (day ?? today).getMonth(), 1);
  const setDay = (date: Date | null) => setDayPick(date);
  const setView = (date: Date) => setViewPick(date);

  const slots: Slot[] = day ? slotsFor(day) : [];
  const monthLabel = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(
    view,
  );
  const firstOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lead7 = (view.getDay() + 6) % 7;
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const summary = slot
    ? `${formatDay(slot, tz, { weekday: 'short', day: 'numeric', month: 'short' })}, ${formatTime(slot, tz, hour24)}`
    : null;
  const end = slot ? new Date(slot.getTime() + SLOT_MINUTES * 60000) : null;
  const when =
    slot && end
      ? `${formatDay(slot, tz, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}, ${formatTime(slot, tz, hour24)} – ${formatTime(end, tz, hour24)} (${gmtLabel(slot, tz)})`
      : '';
  const firstName = person.name.split(' ')[0] ?? person.name;
  const name = form.field('name');
  const email = form.field('email');
  const company = form.field('company');
  const topic = form.field('message');

  const sum = (
    <div className={cx('dw__sum', !slot && 'is-empty')}>
      {slot ? (
        <>
          <b>{summary}</b>
          <span>{s.meetNote}</span>
        </>
      ) : (
        <b>{s.pickPrompt}</b>
      )}
    </div>
  );

  return (
    <>
      {/* Step 1: day + time */}
      <div className={cx('dw__step', step === 'pick' && !form.succeeded && 'is-active')}>
        <div className="dw__scroll" ref={scrollRef}>
          <div className="dw-person">
            <div className="dw-person__ava">
              {person.photo ? <Image src={person.photo.src} alt="" width={48} height={48} /> : null}
            </div>
            <div>
              <b>{person.name}</b>
              <span>{person.role}</span>
            </div>
          </div>
          <h2 className="dw-title">{s.bookTitle}</h2>
          <p className="dw-lead">{lead}</p>
          <div className="dw-meta">
            <span>
              <IconClock />
              {s.duration}
            </span>
            <span>
              <IconVideo />
              {s.platform}
            </span>
            <span>
              <IconCheck width={2} />
              {s.free}
            </span>
          </div>
          <span className="dw-label">{s.pickDay}</span>
          <div className="dw-cal">
            <div className="dw-cal__head">
              <span className="dw-cal__month" aria-live="polite">
                {monthLabel}
              </span>
              <div className="dw-cal__nav">
                <button
                  type="button"
                  aria-label={s.previousMonth}
                  disabled={view <= firstOfThisMonth}
                  onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
                >
                  <IconLeft />
                </button>
                <button
                  type="button"
                  aria-label={s.nextMonth}
                  disabled={new Date(view.getFullYear(), view.getMonth() + 1, 1) > last}
                  onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
                >
                  <IconRight />
                </button>
              </div>
            </div>
            <div className="dw-cal__grid">
              {WEEKDAYS.map((weekday) => (
                <span key={weekday} className="dw-cal__wd">
                  {weekday}
                </span>
              ))}
              {Array.from({ length: lead7 }, (_, i) => (
                <span key={`blank-${i}`} className="dw-cal__blank" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const date = new Date(view.getFullYear(), view.getMonth(), i + 1);
                const open = isDayOpen(date, today, last);
                const selected = day !== null && +day === +date;
                return (
                  <button
                    key={i}
                    type="button"
                    className={cx('dw-day', +date === +today && 'is-today')}
                    disabled={!open}
                    aria-pressed={selected}
                    aria-label={`${formatDay(date, tz, { weekday: 'long', day: 'numeric', month: 'long' })}${open ? '' : `, ${s.unavailable}`}`}
                    onClick={() => {
                      setDay(date);
                      setSlot(null);
                    }}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
          {day ? (
            <div className="dw-times">
              <div className="dw-when">
                <div>
                  <b className="dw-when__day">
                    {slots[0]
                      ? formatDay(slots[0].at, tz, {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                        })
                      : ''}
                  </b>
                  <span className="dw-tz">{slots[0] ? gmtLabel(slots[0].at, tz) : ''}</span>
                </div>
                <div className="dw-seg" role="group" aria-label={s.timeFormat}>
                  <button type="button" aria-pressed={hour24} onClick={() => setHour24(true)}>
                    {s.format24}
                  </button>
                  <button type="button" aria-pressed={!hour24} onClick={() => setHour24(false)}>
                    {s.format12}
                  </button>
                </div>
              </div>
              <div className="dw-slots">
                {slots.map((item) => (
                  <button
                    key={+item.at}
                    type="button"
                    className="dw-slot"
                    disabled={item.off}
                    aria-label={
                      item.off ? `${formatTime(item.at, tz, hour24)}, ${s.booked}` : undefined
                    }
                    aria-pressed={slot !== null && +slot === +item.at}
                    onClick={() => setSlot(item.at)}
                  >
                    {formatTime(item.at, tz, hour24)}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="dw__foot">
          {sum}
          <button
            type="button"
            className={buttonClasses('light')}
            disabled={!slot}
            onClick={() => goStep('details')}
          >
            {s.continue}
            <ButtonArrow />
          </button>
        </div>
      </div>

      {/* Step 2: details */}
      <form
        {...form.formProps}
        onSubmit={(event) => {
          setSentTo(String(new FormData(event.currentTarget).get('email') ?? ''));
          const props = form.formProps;
          if ('onSubmit' in props) props.onSubmit?.(event);
        }}
        className={cx('dw__step dw-book', step === 'details' && !form.succeeded && 'is-active')}
        aria-busy={form.pending || undefined}
        onInput={check}
        onChange={check}
      >
        {form.hiddenFields}
        {bookingForm.security}
        <input type="hidden" name="start" value={slot ? slot.toISOString() : ''} />
        <input type="hidden" name="timezone" value={tz} />
        <div className="dw__scroll">
          <button type="button" className="dw-back" onClick={() => goStep('pick')}>
            <IconLeft />
            {s.changeTime}
          </button>
          <h2 className="dw-title">{s.detailsTitle}</h2>
          <div className="dw-card">
            <b>{s.callWith.replace('{name}', person.name)}</b>
            <ul>
              <li>
                <IconCalendar />
                <span>
                  {slot
                    ? formatDay(slot, tz, {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : ''}
                </span>
              </li>
              <li>
                <IconClock />
                <span>
                  {slot && end
                    ? `${formatTime(slot, tz, hour24)} – ${formatTime(end, tz, hour24)}`
                    : ''}
                </span>
              </li>
              <li>
                <IconVideo />
                <span>
                  {s.platform} <em>{s.meetInviteNote}</em>
                </span>
              </li>
              <li>
                <IconGlobe />
                <span>{slot ? gmtLabel(slot, tz) : ''}</span>
              </li>
            </ul>
          </div>
          <FormFeedback form={form} summaryRef={summaryRef} title={formStrings.summaryTitle} />
          <div className="dw-fields dw-fields--after-card">
            <Field
              label={name.field.label}
              htmlFor={name.ids.input}
              required
              requiredText={formStrings.required}
              floating
              errorId={name.ids.error}
              error={name.error}
            >
              <Input {...name.inputProps} placeholder=" " autoComplete="name" />
            </Field>
            <Field
              label={email.field.label}
              htmlFor={email.ids.input}
              required
              requiredText={formStrings.required}
              floating
              errorId={email.ids.error}
              error={email.error}
            >
              <Input {...email.inputProps} placeholder=" " />
            </Field>
            <Field label={company.field.label} htmlFor={company.ids.input} hideLabel>
              <Input
                {...company.inputProps}
                placeholder={company.field.placeholder ?? company.field.label}
                autoComplete="organization"
              />
            </Field>
            <Field label={topic.field.label} htmlFor={topic.ids.input} hideLabel>
              <Textarea
                {...topic.inputProps}
                placeholder={topic.field.placeholder ?? topic.field.label}
              />
            </Field>
          </div>
        </div>
        <div className="dw__foot">
          {sum}
          <button
            type="submit"
            className={buttonClasses('light')}
            disabled={form.pending || (isHydrated(form) && !ready)}
          >
            {form.pending ? formStrings.sending : bookingForm.config.submitLabel}
            <ButtonArrow />
          </button>
        </div>
      </form>

      {/* Step 3: sent */}
      <DoneStep
        active={form.succeeded}
        title={bookingForm.config.successTitle}
        text={s.bookDone
          .replace('{name}', firstName)
          .replace('{when}', when)
          .replace('{email}', sentTo)}
        again={s.again}
        onAgain={onAgain}
      />
    </>
  );
}

/* ── Send a message ────────────────────────────────────────────────────── */

function MessagePane({
  messageForm,
  strings: s,
  formStrings,
  email: companyEmail,
  consent,
  onAgain,
}: ContactPanelProps & { onAgain: () => void }) {
  const summaryRef = useRef<HTMLDivElement>(null);
  const form = useSiteForm({
    config: messageForm.config,
    messages: messageForm.messages,
    summaryRef,
  });
  const { ready, check } = useReady();
  const advancedId = useId();
  const [needs, setNeeds] = useState<readonly string[]>([]);
  const [budget, setBudget] = useState('');
  const [source, setSource] = useState('');
  const [advanced, setAdvanced] = useState(false);

  const name = form.field('name');
  const email = form.field('email');
  const message = form.field('message');
  const scope = form.field('scope');
  const company = form.field('company');
  const competitors = form.field('competitors');
  const required = formStrings.required;

  const options = (prefix: 'needs' | 'budget' | 'source', count: number) =>
    Array.from({ length: count }, (_, i) => s[`${prefix}${i}` as PanelStringKey]).filter(Boolean);

  return (
    <>
      <form
        {...form.formProps}
        className={cx('dw__step dw-msg', !form.succeeded && 'is-active')}
        aria-busy={form.pending || undefined}
        onInput={check}
        onChange={check}
      >
        {form.hiddenFields}
        {messageForm.security}
        <input type="hidden" name="needs" value={needs.join(', ')} />
        <input type="hidden" name="budget" value={budget} />
        <input type="hidden" name="source" value={source} />
        <div className="dw__scroll">
          <a className="dw-mailbox" href={`mailto:${companyEmail}`}>
            <IconMail />
            <span>
              {s.mailbox} <u>{companyEmail}</u>
            </span>
          </a>
          <p className="dw-or">
            <span>{s.orText}</span>
          </p>
          <FormFeedback form={form} summaryRef={summaryRef} title={formStrings.summaryTitle} />
          <div className="dw-fields dw-fields--2">
            <Field
              label={name.field.label}
              htmlFor={name.ids.input}
              required
              requiredText={required}
              floating
              errorId={name.ids.error}
              error={name.error}
            >
              <Input {...name.inputProps} placeholder=" " autoComplete="name" />
            </Field>
            <Field
              label={email.field.label}
              htmlFor={email.ids.input}
              required
              requiredText={required}
              floating
              errorId={email.ids.error}
              error={email.error}
            >
              <Input {...email.inputProps} placeholder=" " />
            </Field>
          </div>
          <Field
            className="dw-help"
            label={message.field.label}
            htmlFor={message.ids.input}
            hideLabel
          >
            <Textarea
              {...message.inputProps}
              placeholder={message.field.placeholder ?? message.field.label}
            />
          </Field>
          <div className="dw-tools">
            <button
              type="button"
              className="dw-adv"
              role="switch"
              aria-checked={advanced}
              aria-controls={advancedId}
              onClick={() => setAdvanced((now) => !now)}
            >
              <IconSpark />
              <span>{s.advanced}</span>
              <i className="dw-switch" aria-hidden="true" />
            </button>
          </div>
          <div className="dw-advbox" id={advancedId} hidden={!advanced}>
            <span className="dw-label">{s.needsLabel}</span>
            <div className="dw-chips">
              {options('needs', NEEDS).map((option) => {
                const on = needs.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    className="dw-chip"
                    aria-pressed={on}
                    onClick={() =>
                      setNeeds((now) => (on ? now.filter((n) => n !== option) : [...now, option]))
                    }
                  >
                    <IconPlus />
                    {option}
                  </button>
                );
              })}
            </div>
            <span className="dw-label">{s.scopeLabel}</span>
            <div className="dw-opts">
              {(scope.field.options ?? []).map((option, index) => (
                <label key={option.value} className="dw-opt">
                  <input type="radio" name={scope.inputProps.name} value={option.value} />
                  <i aria-hidden="true" />
                  <span>
                    <b>{option.label}</b>
                    {s[`scope${index}Text` as PanelStringKey]}
                  </span>
                </label>
              ))}
            </div>
            <div className="dw-fields">
              <Field label={company.field.label} htmlFor={company.ids.input} hideLabel>
                <Input
                  {...company.inputProps}
                  placeholder={company.field.placeholder ?? company.field.label}
                  autoComplete="organization"
                />
              </Field>
              <Field label={competitors.field.label} htmlFor={competitors.ids.input} hideLabel>
                <Textarea
                  {...competitors.inputProps}
                  placeholder={competitors.field.placeholder ?? competitors.field.label}
                />
              </Field>
            </div>
            <NdaCheck form={form} />
          </div>
          <span className="dw-label">
            {s.budgetLabel} <i>{s.optional}</i>
          </span>
          <div className="dw-chips dw-chips--single">
            {options('budget', BUDGETS).map((option) => (
              <button
                key={option}
                type="button"
                className="dw-chip"
                aria-pressed={budget === option}
                onClick={() => setBudget((now) => (now === option ? '' : option))}
              >
                {option}
              </button>
            ))}
          </div>
          <span className="dw-label">
            {s.sourceLabel} <i>{s.optional}</i>
          </span>
          <div className="dw-chips dw-chips--single">
            {options('source', SOURCES).map((option) => (
              <button
                key={option}
                type="button"
                className="dw-chip"
                aria-pressed={source === option}
                onClick={() => setSource((now) => (now === option ? '' : option))}
              >
                {option}
              </button>
            ))}
          </div>
          <PrivacyCheck form={form} consent={consent} />
        </div>
        <div className="dw__foot">
          <span className="dw-replies">{s.replies}</span>
          <button
            type="submit"
            className={buttonClasses('light')}
            disabled={form.pending || (isHydrated(form) && !ready)}
          >
            {form.pending ? formStrings.sending : messageForm.config.submitLabel}
            <ButtonArrow />
          </button>
        </div>
      </form>
      <DoneStep
        active={form.succeeded}
        title={messageForm.config.successTitle}
        text={messageForm.config.successMessage}
        again={s.again}
        onAgain={onAgain}
      />
    </>
  );
}

/** "Send me an NDA before we talk" checkbox in the panel's own style. */
function NdaCheck({ form }: { form: ReturnType<typeof useSiteForm> }) {
  const nda = form.field('nda');
  return (
    <label className="dw-check">
      <input {...nda.inputProps} />
      <i>
        <IconCheck />
      </i>
      {nda.field.label}
    </label>
  );
}

/** The required privacy checkbox; its text (with the link) is rich text edited in the admin. */
function PrivacyCheck({
  form,
  consent,
}: {
  form: ReturnType<typeof useSiteForm>;
  consent: ReactNode;
}) {
  const privacy = form.field('privacy');
  return (
    <div className="dw-checks">
      <label className="dw-check">
        <input {...privacy.inputProps} />
        <i>
          <IconCheck />
        </i>
        <span>{consent}</span>
      </label>
    </div>
  );
}
