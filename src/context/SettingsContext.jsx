import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import staticConfig from "../config/siteConfig";

const SettingsContext = createContext(staticConfig);

export function SettingsProvider({ children }) {
  const [config, setConfig] = useState(staticConfig);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;

    (async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      if (!active || error || !data) return;

      setConfig((prev) => ({
        ...prev,
        phone: data.phone || prev.phone,
        displayPhone: data.phone ? `+91 ${data.phone}` : prev.displayPhone,
        whatsapp: data.whatsapp || prev.whatsapp,
        email: data.email || prev.email,
        address: data.address || prev.address,
        youtube: data.youtube_url || prev.youtube,
        instagramLinks:
          data.instagram_links && data.instagram_links.length > 0
            ? data.instagram_links
            : prev.instagramLinks,
        founderName: data.founder_name || prev.founderName,
        founderBio: data.founder_bio || prev.founderBio,
        founderPhoto: data.founder_photo_url || prev.founderPhoto,
      }));
    })();

    return () => {
      active = false;
    };
  }, []);

  return <SettingsContext.Provider value={config}>{children}</SettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SettingsContext);
}
