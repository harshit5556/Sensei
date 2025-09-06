"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const DashboardView = ({ insights }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-gradient-to-r from-green-400 to-green-600";
      case "medium":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case "low":
        return "bg-gradient-to-r from-red-400 to-red-600";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="px-3 py-1 rounded-lg">
          Last updated: {lastUpdatedDate}
        </Badge>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[{
          title: "Market Outlook",
          value: insights.marketOutlook,
          icon: <OutlookIcon className={`h-5 w-5 ${outlookColor}`} />,
          desc: `Next update ${nextUpdateDistance}`,
        },
        {
          title: "Industry Growth",
          value: `${insights.growthRate.toFixed(1)}%`,
          icon: <TrendingUp className="h-5 w-5 text-muted-foreground" />,
          desc: <Progress value={insights.growthRate} className="mt-2 h-2 rounded-full" />,
        },
        {
          title: "Demand Level",
          value: insights.demandLevel,
          icon: <BriefcaseIcon className="h-5 w-5 text-muted-foreground" />,
          desc: <div className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(insights.demandLevel)}`} />,
        },
        {
          title: "Top Skills",
          value: null,
          icon: <Brain className="h-5 w-5 text-muted-foreground" />,
          desc: (
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-2 py-1 rounded-md text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          ),
        }].map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="hover:shadow-xl transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                {card.value && <div className="text-2xl font-bold mb-1">{card.value}</div>}
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Salary Ranges Chart */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Salary Ranges by Role</CardTitle>
            <CardDescription>
              Minimum, Median, and Maximum salaries (in thousands)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white dark:bg-gray-900 border rounded-lg p-2 shadow-md">
                            <p className="font-semibold">{label}</p>
                            {payload.map((item) => (
                              <p key={item.name} className="text-sm">
                                {item.name}: ${item.value}K
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="min" fill="#60a5fa" name="Min Salary (K)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="median" fill="#6366f1" name="Median Salary (K)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="max" fill="#8b5cf6" name="Max Salary (K)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Industry Trends & Recommended Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.01 }}>
          <Card>
            <CardHeader>
              <CardTitle>Key Industry Trends</CardTitle>
              <CardDescription>Shaping the industry</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {insights.keyTrends.map((trend, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                    <span>{trend}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.01 }}>
          <Card>
            <CardHeader>
              <CardTitle>Recommended Skills</CardTitle>
              <CardDescription>Consider learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {insights.recommendedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-3 py-1 rounded-full hover:bg-primary hover:text-white transition"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardView;
