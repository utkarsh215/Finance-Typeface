"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  updateProfile,
  signOut,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  LogOut,
  User as UserIcon,
  Mail,
  Pencil,
  Save,
  XCircle,
  Brain,
  Sparkles,
} from "lucide-react";

import DashboardLayout from "@/components/layouts/DashboardLayout";

// ---------- Main Component ----------
export default function AccountPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------- Auth State Sync ----------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return router.push("/login");
      setCurrentUser(user);
      setDisplayName(user.displayName || "");
    });
    return () => unsubscribe();
  }, [router]);

  // ---------- Update Name ----------
  const handleUpdateName = async () => {
    if (!currentUser) return toast.error("No user logged in.");
    const trimmed = displayName.trim();
    if (!trimmed) return toast.error("Display name cannot be empty.");
    if (trimmed === currentUser.displayName) return setIsEditing(false);

    setLoading(true);
    try {
      await updateProfile(currentUser, { displayName: trimmed });
      toast.success("Display name updated!");
      setIsEditing(false);
    } catch (err) {
      toast.error(`Update failed: ${(err as Error).message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Logout ----------
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast.success("Logged out!");
      router.push("/login");
    } catch (err) {
      toast.error(`Logout failed: ${(err as Error).message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Loading Fallback ----------
  if (!currentUser) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[calc(100vh-100px)] items-center justify-center text-gray-400">
          Loading user data...
        </div>
      </DashboardLayout>
    );
  }

  // ---------- Render ----------
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-10 text-foreground p-4 md:p-6">
        <header>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-md text-muted-foreground">
            Manage your profile and learn about Finance-Typeface&apos;s AI capabilities.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {/* Combined Card with AI Info on top and Profile below */}
          <Card className="bg-black text-white border border-gray-800 transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
            <CardContent className="p-6 space-y-8">
              {/* AI Assistant Description - Now at the top */}
              <div>
                <CardTitle className="flex items-center gap-2 mb-4">
                  <Brain size={20} className="text-gray-300" /> About Finance-Typeface AI
                </CardTitle>
                <div className="space-y-4 text-sm">
                  <p className="text-gray-300">
                    Finance-Typeface is powered by advanced AI to give you smart, personalized financial insights.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-2 items-start">
                      <Sparkles size={16} className="text-gray-300 mt-1" />
                      <span><strong className="text-gray-300">Intelligent Insights:</strong> Analyze monthly trends in your finances.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <Sparkles size={16} className="text-gray-300 mt-1" />
                      <span><strong className="text-gray-300">Personalized Tips:</strong> Optimize your budget and reach goals faster.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <Sparkles size={16} className="text-gray-300 mt-1" />
                      <span><strong className="text-gray-300">Anomaly Detection:</strong> Spot suspicious or abnormal spending patterns.</span>
                    </li>
                  </ul>
                  <p className="text-gray-300">
                    We&apos;re continuously enhancing Finance-Typeface&apos;s capabilities to better serve you.
                  </p>
                </div>
              </div>
              
              {/* Divider */}
              <div className="border-t border-gray-800 pt-6">
                <CardTitle className="flex items-center gap-2 mb-4">
                  <UserIcon size={20} /> Your Profile
                </CardTitle>
                
                {/* Email */}
                <div className="space-y-2 mb-6">
                  <Label htmlFor="email" className="flex items-center gap-2 text-white">
                    <Mail size={16} /> Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={currentUser.email || ""}
                    readOnly
                    className="bg-gray-900 text-white border-gray-700 cursor-not-allowed"
                  />
                </div>

                {/* Display Name */}
                <div className="space-y-2 mb-6">
                  <Label htmlFor="displayName" className="flex items-center gap-2 text-white">
                    <UserIcon size={16} /> Display Name
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      readOnly={!isEditing}
                      className={`bg-gray-900 text-white border-gray-700 ${!isEditing ? "cursor-text" : ""}`}
                    />
                    {isEditing ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleUpdateName}
                          disabled={loading}
                          title="Save"
                          className="text-green-400 hover:text-green-500"
                        >
                          <Save size={20} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setIsEditing(false);
                            setDisplayName(currentUser.displayName || "");
                          }}
                          disabled={loading}
                          title="Cancel"
                          className="text-red-400 hover:text-red-500"
                        >
                          <XCircle size={20} />
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsEditing(true)}
                        disabled={loading}
                        title="Edit"
                        className="text-blue-400 hover:text-blue-500"
                      >
                        <Pencil size={20} />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Logout */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleLogout}
                    disabled={loading}
                    className="w-fit px-6 py-2 bg-white hover:bg-gray-200 text-black flex items-center gap-2 rounded-md"
                  >
                    <LogOut size={18} />
                    {loading ? "Logging Out..." : "Logout"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
