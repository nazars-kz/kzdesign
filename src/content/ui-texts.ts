/**
 * PROJECT: the site's interface texts (buttons, form messages, menu labels).
 * Defaults come from src/site/messages/<locale>.json; admins edit them per
 * language on the pages that show them (`uiTexts: [...]` on pages, globals,
 * collections and forms). Add a language file here to give a language its own
 * defaults; languages without one start from the main language.
 * See docs/CONTENT_SCHEMA.md § Interface texts.
 */
import { defineUiTexts } from '@/core/ui-texts/model';

import en from '../site/messages/en.json';

export const uiTexts = defineUiTexts({
  messages: { en },
  namespaces: {
    common: {
      label: 'General',
      texts: {
        skipToContent: 'Skip link at the top of every page',
        menu: 'Menu button on phones',
        closeMenu: 'Name of the menu button while the menu is open',
        mainNavigation: 'Name of the main menu (read by screen readers)',
        mobileNavigation: 'Name of the phone menu (read by screen readers)',
        home: 'Name of the logo link',
      },
    },
    nav: {
      label: 'Menu',
      texts: {
        home: 'Menu link: Home',
        services: 'Menu link: Services',
        cases: 'Menu link: Cases',
        approach: 'Menu link: Approach',
        aboutUs: 'Menu link: About us',
        reviews: 'Menu link: Reviews',
        contactUs: 'Menu link: Contact us',
      },
    },
    footer: {
      label: 'Footer',
      texts: {
        navigation: 'Name of the footer menu (read by screen readers)',
        home: 'Footer link: Home',
        services: 'Footer link: Services',
        cases: 'Footer link: Cases',
        approach: 'Footer link: Approach',
        aboutUs: 'Footer link: About Us',
        reviews: 'Footer link: Reviews',
        contactUs: 'Footer link: Contact Us',
        social: 'Name of the social links (read by screen readers)',
        legal: 'Name of the legal links (read by screen readers)',
        privacy: 'Footer link: Privacy Policy',
        terms: 'Footer link: Terms of Service',
        refund: 'Footer link: Refund Policy',
      },
    },
    cookie: {
      label: 'Cookie banner',
      texts: {
        text: 'Sentence in the cookie banner',
        privacy: 'Link to the privacy policy in the banner',
        accept: 'Button: accept cookies',
        decline: 'Button: decline cookies',
        settings: 'Footer link that reopens the banner',
        label: 'Name of the banner (read by screen readers)',
      },
    },
    home: {
      label: 'Home page',
      texts: {
        viewCaseStudy: 'Link to a case study (testimonials, partners, industries)',
        caseSoon: 'Note when a case study is not published yet',
        previousSlide: 'Testimonials slider: previous button (read by screen readers)',
        nextSlide: 'Testimonials slider: next button (read by screen readers)',
        moreAwards: 'Awards: button that shows all badges (read by screen readers)',
        fewerAwards: 'Awards: button that hides extra badges (read by screen readers)',
        previousService: 'Services tabs: previous button (read by screen readers)',
        nextService: 'Services tabs: next button (read by screen readers)',
        servicesTabs: 'Name of the services tabs (read by screen readers)',
        testimonialsLabel: 'Name of the testimonials slider (read by screen readers)',
        companyEmail: 'Label before the email under the contact form',
      },
    },
    services: {
      label: 'Services',
      texts: {
        learnMore: 'Link to a service on the Services page',
      },
    },
    notFound: {
      label: 'Page not found',
      texts: {
        title: 'Heading of the 404 page',
        body: 'Text of the 404 page',
        back: 'Button on the 404 page',
      },
    },
    forms: {
      label: 'Forms',
      texts: {
        'errors.required': 'Error: a required field is empty',
        'errors.tooLong': 'Error: the text is too long',
        'errors.invalidEmail': 'Error: invalid email address',
        'errors.invalidPhone': 'Error: invalid phone number',
        'errors.invalidOption': 'Error: no option chosen',
        'errors.consent': 'Error: consent is not given',
        summaryTitle: 'Heading above the list of errors',
        required: 'Mark of a required field',
        sending: 'Text on the button while sending',
        notConnected: 'Message when the form is not connected',
        rateLimited: 'Message when someone sends too often',
        error: 'Message when sending failed',
        choose: 'First option of a drop-down list',
        sendAnother: 'Button to send another message',
        confirm: 'Question before sending',
      },
    },
  },
});
