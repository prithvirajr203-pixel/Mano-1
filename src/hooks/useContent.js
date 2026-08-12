import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

export function useContent({
  table,
  orderBy = "created_at",
  fallbackData,
  mapRow,
}) {
  const [items, setItems] = useState(fallbackData);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    let active = true;

    (async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("published", true)
        .order(orderBy, {
          ascending: true,
          nullsFirst: false,
        });

      if (!active) return;

      if (!error && data) {
        setItems(data.map(mapRow));
        setLive(true);
      }

      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [table, orderBy, mapRow]);

  return {
    items,
    loading,
    live,
  };
}