import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import emblem from "@/assets/ashoka-emblem.png";

const Enroll = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    aadhaar: "",
    idType: "",
    password: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, email, phone, aadhaar, idType, password } = form;
    if (!fullName || !email || !phone || !aadhaar || !idType || !password) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    if (aadhaar.length !== 12 || !/^\d+$/.test(aadhaar)) {
      toast({ title: "Error", description: "Aadhaar must be a 12-digit number.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Enrollment Submitted!", description: "Your identity verification is being processed." });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg shadow-[var(--shadow-elevated)] animate-fade-up">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2">
              <img src={emblem} alt="Emblem" className="h-14 w-14 mx-auto opacity-70" />
            </div>
            <CardTitle className="text-2xl">Identity Enrollment</CardTitle>
            <CardDescription>Submit your details and identity proof for verification</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" placeholder="As per ID proof" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="name@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number *</Label>
                  <Input id="aadhaar" placeholder="XXXX XXXX XXXX" maxLength={12} value={form.aadhaar} onChange={(e) => update("aadhaar", e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>ID Proof Type *</Label>
                <Select value={form.idType} onValueChange={(v) => update("idType", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                    <SelectItem value="pan">PAN Card</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="voter">Voter ID</SelectItem>
                    <SelectItem value="driving">Driving License</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="idFile">Upload ID Proof</Label>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="idFile"
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-accent flex-1"
                  >
                    <Upload className="h-4 w-4" />
                    {file ? file.name : "Choose file (PDF, JPG, PNG)"}
                  </label>
                  <input
                    id="idFile"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Create Password *</Label>
                <Input id="password" type="password" placeholder="Minimum 8 characters" value={form.password} onChange={(e) => update("password", e.target.value)} />
              </div>

              <Button type="submit" className="w-full gap-2 shadow-[var(--shadow-saffron)] transition-all duration-200 hover:scale-[1.02]" disabled={loading}>
                {loading ? "Submitting..." : <><UserPlus className="h-4 w-4" /> Submit Enrollment</>}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already enrolled?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline transition-colors">
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Enroll;
