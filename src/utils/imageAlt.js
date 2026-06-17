/** SEO-friendly image alt text helpers */

export function formatLocation(location) {
  if (!location) return 'Andhra Pradesh';
  const trimmed = String(location).trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export function projectName(project) {
  return project?.name?.trim() || 'MB Prime Project';
}

export function projectHeroAlt(project) {
  const name = projectName(project);
  const city = formatLocation(project?.location);
  return `${name} premium real estate development in ${city} – MB Prime Projects`;
}

export function projectMasterPlanAlt(project, zoomed = false) {
  const name = projectName(project);
  const city = formatLocation(project?.location);
  return zoomed
    ? `${name} master plan close-up in ${city} – MB Prime Projects`
    : `${name} master plan layout in ${city} – MB Prime Projects`;
}

export function projectAmenityAlt(project, amenityTitle) {
  const name = projectName(project);
  const city = formatLocation(project?.location);
  const title = amenityTitle?.trim() || 'Amenity';
  return `${title} at ${name} in ${city} – MB Prime Projects`;
}

export function projectGalleryAlt(project, label) {
  const name = projectName(project);
  const city = formatLocation(project?.location);
  const detail = label?.trim() || 'Villa plot';
  return `${detail} at ${name} in ${city} – MB Prime Projects`;
}

export function projectCardAlt(project) {
  const name = projectName(project);
  const city = formatLocation(project?.location);
  return `${name} real estate project in ${city} – MB Prime Projects`;
}

export function projectLogoAlt(project) {
  return `${projectName(project)} logo – MB Prime Projects`;
}

export function projectBadgeAlt(label) {
  return `${label} approved – MB Prime Projects`;
}

export function brandLogoAlt() {
  return 'MB Prime Projects logo';
}

export function homeHeroAlt() {
  return 'MB Prime premium villas and plots in Andhra Pradesh – MB Prime Projects';
}

export function blogImageAlt(title) {
  const t = title?.trim();
  return t ? `${t} – MB Prime Projects blog` : 'MB Prime Projects blog article image';
}

export function founderAlt() {
  return 'Maganti Babu, CEO and Founder of MB Prime Projects';
}

export function locationMapAlt() {
  return 'MB Prime Projects locations across Andhra Pradesh – Srikakulam, Vizianagaram, Vijayawada and Amaravati';
}

export function commitmentsImageAlt() {
  return 'MB Prime luxury real estate development in Andhra Pradesh – MB Prime Projects';
}

export function investmentImageAlt() {
  return 'Andhra Pradesh infrastructure growth and property investment – MB Prime Projects';
}

export function philosophyImageAlt() {
  return 'MB Prime architectural vision for premium residential communities in Andhra Pradesh';
}

export function heroVideoLabel(project) {
  return `${projectName(project)} hero video – ${formatLocation(project?.location)} – MB Prime Projects`;
}
