"use client";

import { useState, useTransition, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { createDashboard, getDashboards } from "@/app/actions";
import Modal from "@/components/Modal";

type Dashboard = {
  id: string;
  name: string;
  widgets: any[];
};

export default function Home() {
  const { data: session } = authClient.useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const data = await getDashboards();
        setDashboards(data);
      } catch (error) {
        console.error("Failed to fetch dashboards", error);
      }
    };

    fetchDashboards();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      try {
        const dashboard = await createDashboard(name);
        if (dashboard?.id) {
          // Add the new dashboard to our local state
          setDashboards([...dashboards, dashboard]);
          router.push(`/dashboard/${dashboard.id}`);
        }
      } catch (error) {
        console.error("Failed to create dashboard", error);
      } finally {
        setModalOpen(false);
        setName("");
      }
    });
  }

  return (
    <div className="p-8 w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Bem vindo, {session?.user.name}</h1>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Dashboards</h2>
          <Button onClick={() => setModalOpen(true)}>
            New Dashboard
          </Button>
        </div>
        
        {dashboards.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">You don't have any dashboards yet</p>
            <Button onClick={() => setModalOpen(true)}>
              Create Your First Dashboard
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboards.map((dashboard) => (
              <Link 
                href={`/dashboard/${dashboard.id}`}
                key={dashboard.id}
                className="block"
              >
                <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg">{dashboard.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {dashboard.widgets?.length || 0} widgets
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <Link href="/naosei">
        <div className="p-4 border rounded hover:bg-gray-50 transition-colors">
          <h1>Hello</h1>
        </div>
      </Link>
      
      {/* Modal for Creating a Dashboard */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Create a Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Dashboard name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            required
          />
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Dashboard"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}