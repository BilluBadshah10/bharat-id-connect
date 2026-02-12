import { Shield, FileCheck, Clock, AlertCircle, CheckCircle2, User, FileText, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";

const documents = [
  { name: "Aadhaar Card", status: "verified", date: "12 Jan 2026" },
  { name: "PAN Card", status: "pending", date: "10 Feb 2026" },
  { name: "Passport", status: "not_submitted", date: "—" },
];

const statusConfig = {
  verified: { label: "Verified", icon: CheckCircle2, color: "bg-secondary text-secondary-foreground" },
  pending: { label: "Pending", icon: Clock, color: "bg-primary text-primary-foreground" },
  not_submitted: { label: "Not Submitted", icon: AlertCircle, color: "bg-muted text-muted-foreground" },
} as const;

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Welcome, Citizen</h1>
          <p className="mt-1 text-muted-foreground">Your identity verification dashboard</p>
        </div>

        {/* Status Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <Card className="shadow-[var(--shadow-card)]">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Verification Status</p>
                <p className="text-lg font-bold text-secondary">Partially Verified</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)]">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documents Submitted</p>
                <p className="text-lg font-bold text-foreground">2 of 3</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)]">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Profile Completion</p>
                <div className="mt-1 flex items-center gap-2">
                  <Progress value={67} className="h-2 w-24" />
                  <span className="text-sm font-semibold text-foreground">67%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Table */}
        <Card className="shadow-[var(--shadow-card)] animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="text-lg">Submitted Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-medium text-muted-foreground">Document</th>
                    <th className="pb-3 font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 font-medium text-muted-foreground">Date</th>
                    <th className="pb-3 font-medium text-muted-foreground text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => {
                    const cfg = statusConfig[doc.status as keyof typeof statusConfig];
                    return (
                      <tr key={doc.name} className="border-b border-border last:border-0 transition-colors hover:bg-muted/50">
                        <td className="py-4 font-medium text-foreground flex items-center gap-2">
                          <FileCheck className="h-4 w-4 text-muted-foreground" />
                          {doc.name}
                        </td>
                        <td className="py-4">
                          <Badge className={`gap-1 ${cfg.color}`}>
                            <cfg.icon className="h-3 w-3" />
                            {cfg.label}
                          </Badge>
                        </td>
                        <td className="py-4 text-muted-foreground">{doc.date}</td>
                        <td className="py-4 text-right">
                          {doc.status === "not_submitted" ? (
                            <Button size="sm" variant="outline" className="transition-all duration-200 hover:scale-105">
                              Upload
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost" className="gap-1 transition-all duration-200 hover:scale-105">
                              <Download className="h-3 w-3" /> View
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
