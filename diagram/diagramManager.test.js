import DiagramManager from './plantuml_viewer.html';

describe('DiagramManager', () => {
  it('should render a diagram', () => {
    const diagramManager = new DiagramManager();
    expect(diagramManager.renderDiagram()).toBeInstanceOf(HTMLElement);
  });

  it('should zoom in and out of the diagram', () => {
    const diagramManager = new DiagramManager();
    diagramManager.zoom(0.1);
    expect(diagramManager.currentScale).toBeGreaterThan(1);
    diagramManager.zoom(-0.1);
    expect(diagramManager.currentScale).toBeLessThan(1);
  });

  it('should export the diagram as an image', () => {
    const diagramManager = new DiagramManager();
    const exportButton = diagramManager.exportDiagram();
    expect(exportButton).toBeInstanceOf(HTMLElement);
  });
});
