import React, { useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileUI({
  profile,
  editMode,
  setEditMode,
  formData,
  handleChange,
  handleSubmit,
  loading,
  menuOpen,
  setMenuOpen,
  handleLogout,
  savedJobs,
  confirmDelete,
  setConfirmDelete,
  jobToDelete,
  setJobToDelete,
  handleRemoveJob,
}) {
  // Memoized avatar/resume URLs to prevent unnecessary re-renders
  const avatarUrl = useMemo(
    () => profile?.avatar || "/logo.png",
    [profile?.avatar]
  );

  const resumeUrl = useMemo(
    () => profile?.resume || null,
    [profile?.resume]
  );

  // Safe default values
  const name = profile?.name || "Guest";
  const email = profile?.email || "-";
  const mobile = profile?.mobile || "-";
  const workStatus = profile?.workStatus || "fresher";
  const notifications = profile?.notifications ?? false;

  return (
    <>
      {/* CONFIRM DELETE DIALOG */}
      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent className="max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Remove Saved Job?</DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to remove this job from your saved list?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemoveJob}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MAIN LAYOUT */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-8 relative">
        {/* LEFT SIDEBAR */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-96 shadow-xl rounded-2xl p-6 flex flex-col items-center
            bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-50 border border-yellow-200"
          >
            {/* PROFILE + MENU */}
            <div className="cursor-pointer flex flex-col items-center" onClick={() => setMenuOpen(!menuOpen)}>
              <Avatar className="w-24 h-24 shadow-md border border-gray-200">
                <AvatarImage src={avatarUrl} alt="Profile Pic" />
                <AvatarFallback>{name[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>

              <h2 className="mt-4 text-xl font-semibold">{name}</h2>
              <p className="text-gray-500 text-sm">{email}</p>
            </div>

            {/* DROPDOWN MENU */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-28 right-5 bg-white shadow-md rounded-lg border w-40 z-50"
                >
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => { setEditMode(false); setMenuOpen(false); }}
                  >
                    View Profile
                  </div>

                  <div
                    className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Badge className="mt-3 px-3 py-1 text-sm capitalize">{workStatus}</Badge>
            <Separator className="my-5" />

            <div className="space-y-3 w-full">
              <Button className="w-full" onClick={() => setEditMode(true)} variant="secondary">
                Edit Profile
              </Button>

              <Button className="w-full" variant="outline" onClick={() => resumeUrl && window.open(resumeUrl)} disabled={!resumeUrl}>
                View Resume
              </Button>

              {/* SAVED JOBS */}
              {savedJobs?.length > 0 && (
                <div className="mt-5 w-full">
                  <h3 className="text-lg font-semibold mb-2">Saved Jobs</h3>
                  <div className="flex flex-col gap-4 max-h-[650px] overflow-y-auto pr-2">
                    {savedJobs.map((job) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="p-5 border border-gray-300 rounded-lg hover:shadow-xl
                          cursor-pointer flex justify-between items-center"
                        >
                          <div onClick={() => window.open(`/jobs/${job.id}`, "_blank")}>
                            <p className="text-base font-semibold">{job.jobTitle}</p>
                            <p className="text-sm text-gray-600">{job.companyName}</p>
                            <Badge className="mt-1 text-[12px] bg-blue-100 text-blue-800">{job.department || "General"}</Badge>
                          </div>

                          <Button size="sm" variant="destructive" className="ml-4 h-8" onClick={() => { setJobToDelete(job.id); setConfirmDelete(true); }}>
                            Remove
                          </Button>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* RIGHT MAIN PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <Card className="rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white/80 backdrop-blur-lg border">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {editMode ? "Edit Your Profile" : "Profile Details"}
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-7 mt-6">
              {/* EDIT MODE */}
              {editMode ? (
                <>
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input name="name" value={formData.name || ""} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label>Mobile Number</Label>
                    <Input name="mobile" value={formData.mobile || ""} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label>Work Status</Label>
                    <select name="workStatus" value={formData.workStatus || "fresher"} onChange={handleChange} className="w-full h-11 border rounded-xl px-3">
                      <option value="fresher">Fresher</option>
                      <option value="experienced">Experienced</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <input type="checkbox" name="notifications" checked={formData.notifications || false} onChange={handleChange} className="h-5 w-5" />
                    <Label>Receive Notifications</Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Avatar</Label>
                    <Input type="file" name="avatar" onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label>Resume</Label>
                    <Input type="file" name="resume" onChange={handleChange} />
                  </div>
                </>
              ) : (
                /* VIEW MODE */
                <div className="space-y-5 text-[15px] leading-relaxed">
                  <p><strong>Name:</strong> {name}</p>
                  <p><strong>Email:</strong> {email}</p>
                  <p><strong>Mobile:</strong> {mobile}</p>
                  <p><strong>Work Status:</strong> {workStatus}</p>
                  <p><strong>Notifications:</strong> {notifications ? "Yes" : "No"}</p>

                  <img src={avatarUrl} className="w-24 h-24 rounded-full mt-2 border shadow-sm object-cover" alt="Avatar" />

                  {resumeUrl && (
                    <p>
                      <strong>Resume:</strong>{" "}
                      <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">
                        View Document
                      </a>
                    </p>
                  )}
                </div>
              )}
            </CardContent>

            {/* FOOTER BUTTONS */}
            <CardFooter className="flex justify-end gap-3 mt-2">
              {editMode && (
                <>
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving…" : "Save Changes"}
                  </Button>
                  <Button variant="secondary" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
