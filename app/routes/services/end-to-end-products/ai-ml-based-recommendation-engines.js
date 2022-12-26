import Route from '@ember/routing/route';
import { FAQ_DATA } from '../../../constants/services/faq';
import { AIML } from '../../../constants/services/end-to-end-products';
import { inject as service } from '@ember/service';

export default class ServicesEndToEndProductsAIMLBasedRecommendationRoute extends Route {
  @service headData;
  async model() {
    const faqData = FAQ_DATA;
    const aiMl = AIML;
    return { faqData, aiMl };
  }

  beforeModel() {
    const title = 'Artificial Intelligence Services And Solutions | Primathon';
    const description =
      ' Are you looking for the top artificial intelligence services for business? Primathon is the best artificial intelligence services and solutions provider India.';
    const keywords =
      'artificial intelligence services and solutions artificial intelligence service offerings noida artificial intelligence service provider delhi artificial intelligence services for business artificial intelligence solutions provider india ';

    this.headData.setData({ title, description, keywords });
  }
}