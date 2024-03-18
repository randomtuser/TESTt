import { supabase } from '../../../supabase';

export async function getUserData(id) {
  return supabase.from('profiles').select().eq('id', id);
}
export async function getArticles() {
  return supabase.from('articles').select('*');
}
export async function deleteArticleId(article) {
  return supabase.from('articles').delete().eq('id', article.id);
}
