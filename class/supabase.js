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
        .like('cellPhoneContact', contact)


    
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

    // console.log(params)

    try {
      // Remove properties with null values from params
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== null)
      );
  
      const { data, error } = await supabase
        .from('tbl_applications')
        .insert(cleanParams);
  
      if (error) {
        console.error('Error inserting data into Supabase:', error);
        return;
      }

      let { data: tbl_applications } = await supabase
      .from('tbl_applications')
      .select("tracking_number")

      // Filters
      .eq('cellPhoneContact', params.cellPhoneContact)
      // console.log(tbl_applications[0].tracking_number)
      let tn = {
        tracking_number: tbl_applications[0].tracking_number
      }
      return tbl_applications[0].tracking_number;
    } catch (error) {
      console.error('Error inserting data into Supabase:', error);
      throw error;
    }
    
    
}
