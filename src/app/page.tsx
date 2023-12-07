import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <Link href={"/components"}>
        <button className="btn btn-primary">列表页</button>
      </Link>
    </div>
  );
}
