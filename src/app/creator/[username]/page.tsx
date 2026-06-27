import Link from "next/link";
import { Button } from "@/components/ui/button";
import CreatorProfileClient from "./CreatorProfileClient";
import { creators, getCreator } from "@/lib/mockData";

export async function generateStaticParams() {
  return creators.map((creator) => ({
    username: creator.id,
  }));
}

export default async function CreatorProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const creator = getCreator(username);

  if (!creator) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Creator Not Found</h1>
          <p className="mb-8 text-gray-400">This pup ran behind the couch with the routing table.</p>
          <Link href="/feed">
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Feed</Button>
          </Link>
        </div>
      </div>
    );
  }

  return <CreatorProfileClient creator={creator} />;
}
