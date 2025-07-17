import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import DishCard from './DishCard';

export default function Profile({ user }) {
  const [myDishes, setMyDishes] = useState([]);

  useEffect(() => {
    async function fetchMyDishes() {
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .eq('creatorId', user.id);

      if (!error) setMyDishes(data);
    }

    if (user) fetchMyDishes();
  }, [user]);}