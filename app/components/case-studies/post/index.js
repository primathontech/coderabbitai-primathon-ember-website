import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CaseStudiesPostIndexComponent extends Component {
  @tracked selectedTag = [];

  get tags() {
    return [
      'All',
      'AI/ML',
      'Booking Platforms',
      'Admin Panel',
      'Mobile Apps',
      'Web Development',
      'Fintech',
      'Blockchain',
      'ERC 20',
      'SaaS',
      'Data Migration',
      'Smart Contract',
    ];
  }

  get postData() {
    return [
      {
        url: 'bloom',
        poster: '/assets/caseStudy/bloom.png',
        title:
          'Bloom Hotel: Building a high performance complete booking engine for one of the biggest hotel chains in India',
        description:
          'Bloom Hotels is a renowned chain of hotels in India that offers affordability, comfort, and simplicity to a new generation of travelers who value collecting experiences.',
        tags: ['A/B Testing', ' Fully Dynamic CMS', 'Sentry for Analytics'],
      },

      {
        url: 'jar',
        poster: '/assets/caseStudy/jar.png',
        title: 'Creating a Disruptive Digital Gold Investment App: The Jar Story',
        description:
          'In the age of consumerism and easy gratification that often leaves our souls and wallets both feeling empty, we want to help millions of Indians rediscover the undeniable, cumulative advantages of saving every single day. ',
        tags: ['Secure Infrastructure', 'Product Launch', 'Payment Gateway'],
      },

      {
        url: 'fi',
        poster: '/assets/caseStudy/fi.png',
        title: 'Developing the Best Digital Banking Platform for FI: A Success Story',
        description:
          'Fi is a financial app that comes with an in-built savings account. Emboldened by cutting edge tech, Fi helps you know your money, grow your money and organise your funds.',
        tags: ['Developed Website', 'Waitlist onboarding workflow', 'Regular updates'],
      },

      {
        url: 'freshworks',
        poster: '/assets/caseStudy/freshworks.png',
        title:
          'Freshworks: Build scalable solutions and applications for one of the biggest SAAS solution provider Freshworks',
        description:
          'Freshworks builds tech that works for everyone, making it easy for IT, customer service, sales, marketers and HR to do their job and delight their customers.',
        tags: ['15 custom apps', 'Integrated agileCRM', 'Integrated Frontapp'],
      },

      {
        url: 'paxful',
        poster: '/assets/caseStudy/paxful.png',
        title: 'Paxful: Building a heavy transaction cryptocurrency exchange platform',
        description:
          'Paxful is a global peer-to-peer platform building a financial system for the 100% — one #Bitcoin at a time. ',
        tags: ['Orderbook Implementation', 'Crypto Exchange', 'Comprehensive User interface'],
      },
    ];
  }

  @action
  onSelect(tag) {
    if (this.selectedTag.includes(tag)) {
      this.selectedTag = this.selectedTag.filter((e) => e !== tag);
    } else {
      this.selectedTag = [...this.selectedTag, tag];
    }
  }
}
