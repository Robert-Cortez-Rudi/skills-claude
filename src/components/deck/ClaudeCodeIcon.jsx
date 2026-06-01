import claudeCodeIconUrl from "../../assets/icons/claudecode-icon.svg";

export function ClaudeCodeIcon() {
  return (
    <span
      className="claude-code-icon"
      style={{ "--icon-url": `url("${claudeCodeIconUrl}")` }}
      aria-hidden="true"
    />
  );
}
