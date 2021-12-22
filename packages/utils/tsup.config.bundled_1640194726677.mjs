// tsup.config.ts
import { defineConfig } from "tsup";
var tsup_config_default = defineConfig(({ watch }) => ({
  entry: ["src/index.ts"],
  clean: true,
  watch,
  sourcemap: watch ? "inline" : true,
  dts: true,
  format: ["cjs", "esm"],
  target: "node16"
}));
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3RzdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgd2F0Y2ggfSkgPT4gKHtcbiAgZW50cnk6IFsnc3JjL2luZGV4LnRzJ10sXG4gIGNsZWFuOiB0cnVlLFxuICB3YXRjaCxcbiAgc291cmNlbWFwOiB3YXRjaCA/ICdpbmxpbmUnIDogdHJ1ZSxcbiAgZHRzOiB0cnVlLFxuICBmb3JtYXQ6IFsnY2pzJywgJ2VzbSddLFxuICB0YXJnZXQ6ICdub2RlMTYnLFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBO0FBRUEsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxZQUFhO0FBQUEsRUFDMUMsT0FBTyxDQUFDO0FBQUEsRUFDUixPQUFPO0FBQUEsRUFDUDtBQUFBLEVBQ0EsV0FBVyxRQUFRLFdBQVc7QUFBQSxFQUM5QixLQUFLO0FBQUEsRUFDTCxRQUFRLENBQUMsT0FBTztBQUFBLEVBQ2hCLFFBQVE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
