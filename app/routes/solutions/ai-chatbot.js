import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { AI_CHATBOT } from '../../constants/solutions/ai-chatbot';
import { TESTIMONIAL_DATA } from '../../constants/homepage/testimonial';

export default class ServicesEndToEndProductsAiChatbotRoute extends Route {
  @service headData;
  async model() {
    const aiChatbotData = AI_CHATBOT;
    const testinomialData = TESTIMONIAL_DATA;
    return { aiChatbotData, testinomialData };
  }

  beforeModel() {
    const title = 'Best AI Conversational Chatbots Across India | Primathon';
    const description =
      'Explore top AI Conversational Chatbots for seamless engagement and business acceleration. Connect with us to elevate your operations with powerful automation.';

    this.headData.setData({ title, description });
  }
}
