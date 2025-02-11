import { ActionContext } from "@/context/ActionContext";
import {
  SandpackPreview,
  SandpackPreviewRef,
  useSandpack,
} from "@codesandbox/sandpack-react";
import React, { useContext } from "react";
import JSZip from "jszip";

function SandPackPreviewClient() {
  const { sandpack } = useSandpack();
  const previewRef = React.useRef<null | SandpackPreviewRef | any>(null);
  const { action, setAction } = useContext(ActionContext);
  React.useEffect(() => {
    const GetSandPackClient = async () => {
      const client = previewRef.current?.getClient();

      if (client) {
        console.log({ client });
        const result = (await client?.getCodeSandboxURL()) as any;
        if (action.actionType === "deploy") {
          window.open(`https://${result.sandboxId}.csb.app/`);
        } else if (action.actionType === "export") {
          // Add code to handle file download when action type is 'export'
          if (action.actionType === "export") {
            const files = client.sandboxSetup.files;

            // Create zip file content
            const zip = new JSZip();

            // Add each file to the zip
            Object.entries(files).forEach(
              ([path, fileContent]: [string, any]) => {
                zip.file(path.replace(/^\//, ""), fileContent.code);
              }
            );

            // Generate and download zip file
            zip.generateAsync({ type: "blob" }).then((content:any) => {
              const url = window.URL.createObjectURL(content);
              const link = document.createElement("a");
              link.href = url;
              link.download = "project.zip";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
            });
          }
        }
      }
    };
    GetSandPackClient();
    /**
     * NOTE: In order to make sure that the client will be available
     * use the whole `sandpack` object as a dependency.
     */
  }, [sandpack && action]);
  return (
    <SandpackPreview
      style={{ height: "82vh" }}
      showNavigator={true}
      ref={previewRef}
    />
  );
}

export default SandPackPreviewClient;
