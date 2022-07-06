import "../../styles/components/workspaceMenuTab.css";

function WorkspaceMenuTab({ isShow }) {
  return (
    <div
      className={`workspace-menu-tab workspace-menu-tab--${
        isShow ? "active" : "inactive"
      }`}
    >
      <div className="workspace-menu-tab__header">
        <h3 className="workspace-menu__title">Menu</h3>
      </div>

      <div className="workspace-menu-tab__body"></div>
    </div>
  );
}

export default WorkspaceMenuTab;
