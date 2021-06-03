import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');

export default async (ctx) => {
  await ctx.store.dispatch('nuxtClientInit', ctx);
};
