import type { PageViewProps } from '@/core/content/page-route';

import { SiteImage } from '../../components/ui/site-image';
import { TachLogo } from './tach-logo';
import { CloseIcon, cssVars, PlusIcon } from './tach-parts';

type Content = PageViewProps<'case-tach'>['content'];

/** The tablet on rocks with the "Add Maintenance Reminder" dialog over its corner (coded). */
export function TachScene({ scene }: { scene: Content['scene'] }) {
  const [selected] = scene.remindOptions;
  return (
    <section className="tach-scene tach-tile">
      <SiteImage image={scene.image} sizes="100vw" className="tach-shot" />
      <div className="tach-dialog" role="group" aria-label={scene.dialogTitle}>
        <div className="tach-dialog__head">
          <span className="tach-dialog__title">{scene.dialogTitle}</span>
          <CloseIcon className="tach-dialog__close" />
        </div>
        <div className="tach-dialog__body">
          <p className="tach-dialog__label">{scene.typeLabel}</p>
          <p className="tach-dialog__field">
            {scene.typeValue}
            <PlusIcon className="tach-dialog__plus" />
          </p>
          <p className="tach-dialog__label">{scene.remindLabel}</p>
          <ul className="tach-dialog__radios">
            {scene.remindOptions.map((option) => (
              <li key={option} className="tach-dialog__radio" data-selected={option === selected}>
                {option}
              </li>
            ))}
          </ul>
          <p className="tach-dialog__label">{scene.dateLabel}</p>
          <p className="tach-dialog__field">
            {scene.dateValue}
            <PlusIcon className="tach-dialog__plus" />
          </p>
        </div>
        <div className="tach-dialog__foot">
          <span className="tach-dialog__button">{scene.cancel}</span>
          <span className="tach-dialog__button" data-primary="true">
            {scene.confirm}
          </span>
        </div>
      </div>
    </section>
  );
}

/** The logo, what the product is and the facts table. */
export function TachOverview({ overview }: { overview: Content['overview'] }) {
  return (
    <section className="tach-overview">
      <TachLogo className="tach-overview__logo" />
      <p className="tach-overview__lead">{overview.lead}</p>
      <p className="tach-overview__text">{overview.text}</p>
      {overview.website.href ? (
        <a
          className="tach-overview__link"
          href={overview.website.href}
          {...(overview.website.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {overview.website.label}
        </a>
      ) : null}
      <dl className="tach-facts">
        {overview.facts.map((fact) => (
          <div key={fact._key} className="tach-facts__row">
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** The dark "Workflow plan": months across, bars placed by their start and length in months. */
export function TachWorkflow({ workflow }: { workflow: Content['workflow'] }) {
  const months = workflow.months.length || 1;
  const rows = Math.max(1, ...workflow.bars.map((bar) => bar.row));
  return (
    <section className="tach-workflow" aria-labelledby="tach-workflow-title">
      <div className="tach-workflow__head">
        <h2 id="tach-workflow-title" className="tach-workflow__title">
          {workflow.title}
        </h2>
        <p className="tach-workflow__duration">{workflow.duration}</p>
      </div>
      <div className="tach-gantt" style={cssVars({ '--tach-months': months, '--tach-rows': rows })}>
        <ul className="tach-gantt__months">
          {workflow.months.map((month) => (
            <li key={month}>{month}</li>
          ))}
        </ul>
        <ol className="tach-gantt__bars">
          {workflow.bars.map((bar) => (
            <li
              key={bar._key}
              className="tach-bar"
              data-tone={bar.tone}
              style={cssVars({
                '--tach-row': bar.row,
                '--tach-start': bar.start,
                '--tach-length': bar.length,
              })}
            >
              <span className="tach-bar__label">{bar.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** The truck at dusk with three interface cards floating over it (coded). */
export function TachShowcase({ showcase }: { showcase: Content['showcase'] }) {
  return (
    <section className="tach-showcase tach-tile">
      <SiteImage image={showcase.image} sizes="100vw" className="tach-shot" />
      <div className="tach-showcase__cards">
        <div className="tach-float tach-float--balance">
          <p className="tach-float__label">{showcase.balanceLabel}</p>
          <p className="tach-float__value">{showcase.balanceValue}</p>
          <p className="tach-float__note">{showcase.balanceNote}</p>
        </div>
        <div className="tach-float tach-float--budget">
          <p className="tach-float__title">{showcase.budgetTitle}</p>
          <dl className="tach-budget__totals">
            <div>
              <dt>{showcase.revenueLabel}</dt>
              <dd>{showcase.revenueValue}</dd>
            </div>
            <div>
              <dt>{showcase.expensesLabel}</dt>
              <dd>{showcase.expensesValue}</dd>
            </div>
          </dl>
          <div className="tach-budget__chart">
            <span className="tach-donut" aria-hidden="true" />
            <ul className="tach-budget__callouts">
              {showcase.callouts.map((callout) => (
                <li key={callout._key}>
                  <span>{callout.label}</span>
                  <strong>{callout.value}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="tach-float tach-float--amount">
          <p className="tach-float__label">{showcase.amountLabel}</p>
          <p className="tach-float__value">{showcase.amountValue}</p>
          <p className="tach-float__note">{showcase.amountNote}</p>
        </div>
      </div>
    </section>
  );
}
