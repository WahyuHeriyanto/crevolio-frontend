import { supabase } from "../../lib/supabaseClient";
import DetailMobileApp from "../../components/detail/DetailMobileApp";
import DetailDesignPorto from "@/components/detail/DetailDesignPorto";

export async function getServerSideProps({ params }) {
  const { username, slug } = params;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("username", username)
    .single();

  if (!profile) return { notFound: true };

  const { data: project } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", profile.id)
    .ilike("title", slug.replace(/-/g, " "))
    .maybeSingle();

  if (!project) return { notFound: true };

  return {
    props: { profile, project },
  };
}

export default function ProjectPage({ profile, project }) {
  const type = project.content_type?.[0];

  if (project.content_type[0] === "Mobile App") {
    return <DetailMobileApp profile={profile} project={project} />;
  }
  if (project.content_type[0] === "Design") {
    return <DetailDesignPorto profile={profile} project={project} />;
  }

  return <div>Belum didukung</div>;

}
