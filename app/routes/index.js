import Route from '@ember/routing/route';
import { SERVICE_DATA } from '../constants/homepage/services';
import { CORE_VALUE_DATA } from '../constants/homepage/core-value';
import { BLOG_DATA } from '../constants/homepage/blog';
import { TESTIMONIAL_DATA } from '../constants/homepage/testimonial';
import { EMPLOYEE_TESTIMONIAL_DATA } from '../constants/careers/testimonial';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service headData;

  _HOSTNAME = '/blog';
  _PAGE_SIZE = 4;
  _URL = `${this._HOSTNAME}/wp-json/wp/v2/posts?_embed&per_page=${this._PAGE_SIZE}`;

  getImageUrl(data) {
    if (
      data._embedded &&
      data._embedded['wp:featuredmedia'] &&
      data._embedded['wp:featuredmedia'][0] &&
      data._embedded['wp:featuredmedia'][0].source_url
    ) {
      return data._embedded['wp:featuredmedia']['0'].source_url;
    }
  }

  async model() {
    const serviceData = SERVICE_DATA;
    const coreValueData = CORE_VALUE_DATA;
    const testimonialData = TESTIMONIAL_DATA;
    const blogData = BLOG_DATA;
    const employeeTestimonialData = EMPLOYEE_TESTIMONIAL_DATA;
    try {
      const blogResponse = (await (await fetch(this._URL)).json()).slice(0, 6);
      blogData['data'] = blogResponse.map((data) => {
        return {
          title: data.title?.rendered,
          link: data.link,
          blogImageUrl: this.getImageUrl(data),
          descriptionHtml: data.excerpt?.rendered,
        };
      });
    } catch (error) {
      //console.error('error', error);
      blogData['data'] = [];
    }
    return { serviceData, coreValueData, testimonialData, blogData, employeeTestimonialData };
  }

  afterModel() {
     this.headData.title = 'Best Custom Software Development Company India| Primathon';
     this.headData.description =
       ' If you are looking for the best custom software service India then you have come to the right place. Primathon is the top web application development company Delhi.';
     this.headData.keywords =
       'best custom software development company india custom software application development services web application development services india top web application development company delhi best companies for software engineers gurgaon software application development company noida ';
  }
}
