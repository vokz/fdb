import env from '../env';
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

export const supaBase_testConnection = async () => {
  const supabaseUrl = env.PROJECT_URL;
  const supabaseKey = env.API_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    const { data: tbl_applications, error } = await supabase
      .from('tbl_applications')
      .select('*');

    if (error) {
      console.error('Error fetching data from Supabase:', error);
      throw new Error('Error fetching data from Supabase');
    }

    // console.log('tbl_applications data:', tbl_applications); // Check the retrieved data
    return tbl_applications;
  } catch (error) {
    console.error('Error fetching data from Supabase:', error);
    throw error;
  }
};

export const checkStatus = async ( contact ) => {
    const supabaseUrl = env.PROJECT_URL;
    const supabaseKey = env.API_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        
        let { data: tbl_applications, error } = await supabase
        .from('tbl_applications')
        .select("*")

        // Filters
        .like('contact', contact)


    
        if (error) {
          console.error('Error fetching data from Supabase:', error);
          throw new Error('Error fetching data from Supabase');
        }
    
        // console.log('tbl_applications data:', tbl_applications); // Check the retrieved data
        return tbl_applications;
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
        throw error;
      }
}

export const submitApplication = async ( params ) => {
    const supabaseUrl = env.PROJECT_URL;
    const supabaseKey = env.API_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        const { data, error } = await supabase
        .from('tbl_applications')
        .insert(params)

    
        if (error) {
          console.error('Error fetching data from Supabase:', error);
          throw new Error('Error fetching data from Supabase');
        }

        console.log(params)
    
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
        throw error;
      }
}
