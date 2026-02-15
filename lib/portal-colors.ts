export const portalColors = {
  respengr: '#FF00FF',
  prappt: '#00FFFF',
  aiboumos: '#8040C0',
} as const;

export type PortalName = keyof typeof portalColors;
