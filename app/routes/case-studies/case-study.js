import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default class CaseStudiesCaseStudyRoute extends Route {
  @service headData;

  beforeModel() {
    const title = 'Top Custom Software Development Services India | Primathon';
    const description =
      'Looking for the best custom software service in India? Look no further than Primathon - the premier web application development company in Delhi.';
    const keywords =
      'best custom software development company india custom software application development services web application development services india top web application development company delhi best companies for software engineers gurgaon software application development company noida ';

    this.headData.setData({ title, description, keywords });
  }

  async model(obj) {
    const post = obj.post_id;
    const json = await fetch(`/json-data/casestudies/${post}Page.json`);
    const data = await json.json();
    return data;
  }
}
