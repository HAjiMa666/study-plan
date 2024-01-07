import Demo from "@/components/DragDropCpn/demo-1";
import BatchAdd from "./BatchAdd";
import Demo2 from "@/components/DragDropCpn/demo-2";

export default function HomePage() {
  return (
    <div>
      <h2>React Dnd 拖拽 Demo</h2>
      <Demo2 />
      {/* <BatchAdd tableActionRef={undefined} /> */}
    </div>
  );
}
