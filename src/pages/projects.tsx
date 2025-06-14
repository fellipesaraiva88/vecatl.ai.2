import ProjectsList from "@/components/ProjectsList";
import "@/components/ProjectsList.css"; // Make sure to import CSS here

export default function ProjectsPage() {
  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <ProjectsList />
    </div>
  );
}
