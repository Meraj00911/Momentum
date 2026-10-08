"use client";

import "../dashboard.css";
import { AnimatePresence, motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowDownRight,
  ArrowUpRight,
  Activity,
  BarChart3,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
type Tab =
  | "Dashboard"
  | "Performance"
  | "History"
  | "Commentary"
  | "Settings";
  type DashboardWeek = {
  week: string;
  spend: number;
  revenue: number;
  roas: number;
  conversions: number;
  cpc: number;
  ctr: number;
  commentary: string;
};
type DashboardMonth = {
  id: string;
  monthStart: string;
  spend: number;
  revenue: number;
  roas: number;
  conversions: number;
  cpc: number;
  ctr: number;
  commentary: string;
};
const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Performance", icon: BarChart3 },
  { name: "History", icon: CreditCard },
];

const formatMoney = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

function Change({
  value,
  positive = true,
}: {
  value: string;
  positive?: boolean;
}) {
  return (
    <span className={`change ${positive ? "positive" : "negative"}`}>
      {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      {value}
    </span>
  );
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  accent,
  delay,
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
  accent: string;
  delay: number;
}) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.035,
        y: -7,
        transition: {
          type: "spring",
          stiffness: 280,
          damping: 22,
          mass: 0.7,
        },
      }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="stat-top">
        <div className="stat-icon" style={{ background: accent }}>
          <Icon size={18} />
        </div>

        <Change value={change} />
      </div>

      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>

      <div className="stat-footer">
        <span>vs previous week</span>
      </div>
    </motion.div>
  );
}

function RevenueChart({ weeks }: { weeks: DashboardWeek[] }) {
  const [activePoint, setActivePoint] = useState<number | null>(null);

const data = weeks.map((item, index) => ({
  label: item.week,
  revenue: item.revenue,
  spend: item.spend,
  roas: item.roas,
  conversions: item.conversions,
  previousRevenue:
    index > 0 ? weeks[index - 1].revenue : item.revenue,
}));

const maxRevenue = Math.max(
  ...data.map((item) => item.revenue),
  1
);

const minRevenue = Math.min(
  ...data.map((item) => item.revenue),
  0
);

const points = data.map((item, index) => {
  const x =
    data.length === 1
      ? 350
      : (index / (data.length - 1)) * 700;

  const range = maxRevenue - minRevenue || 1;

  const y =
    165 -
    ((item.revenue - minRevenue) / range) * 125;

  return { x, y };
});

  const active =
    activePoint !== null ? data[activePoint] : null;

  const activePosition =
    activePoint !== null ? points[activePoint] : null;

const percentageChange = active
  ? ((active.revenue - active.previousRevenue) /
      active.previousRevenue) *
    100
  : 0;

  const formatCompact = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    }

    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="chart-wrap">
      <div className="chart-stage">
        <svg
          className="chart"
          viewBox="0 0 700 190"
          preserveAspectRatio="none"
          onMouseLeave={() => setActivePoint(null)}
        >
          <defs>
            <linearGradient
              id="area"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#111111"
                stopOpacity=".14"
              />
              <stop
                offset="100%"
                stopColor="#111111"
                stopOpacity="0"
              />
            </linearGradient>

            <filter
              id="pointShadow"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="3"
                floodColor="#000"
                floodOpacity=".16"
              />
            </filter>
          </defs>

          {[35, 75, 115, 155].map((y) => (
            <line
              key={y}
              x1="0"
              x2="700"
              y1={y}
              y2={y}
              stroke="#ededed"
              strokeWidth="1"
            />
          ))}

          <motion.polygon
            points={`0,190 ${points
              .map((p) => `${p.x},${p.y}`)
              .join(" ")} 700,190`}
            fill="url(#area)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.polyline
            points={points
              .map((p) => `${p.x},${p.y}`)
              .join(" ")}
            fill="none"
            stroke="#111111"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {points.map((point, index) => {
            const selected = activePoint === index;

            return (
<g
  key={index}
  className="chart-point"
  onMouseEnter={() => setActivePoint(index)}
  onClick={() => setActivePoint(index)}
>
  <circle
    cx={point.x}
    cy={point.y}
    r={selected ? 6 : 4}
    fill="#fff"
    stroke="#111"   
    strokeWidth={selected ? 2.5 : 2}
  />

  <circle
    cx={point.x}
    cy={point.y}
    r="17"
    fill="transparent"
  />
</g>
            );
          })}
        </svg>

        <AnimatePresence>
          {active && activePosition && (
            <motion.div
className={`chart-tooltip ${
  activePoint !== null &&
  activePoint === data.length - 1
    ? "tooltip-left"
    : ""
}`}
              style={{
                left: `${(activePosition.x / 700) * 100}%`,
                top: `${(activePosition.y / 190) * 100}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0.82,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: -12,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 5,
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 27,
                mass: 0.7,
              }}
            >
              <div className="tooltip-header">
                <span>{active.label}</span>
                <span className="tooltip-live">WEEK</span>
              </div>

              <div className="tooltip-revenue">
                <span>Revenue</span>
                <strong>
                  {formatCompact(active.revenue)}
                </strong>
              </div>

              <div className="tooltip-divider" />

              <div className="tooltip-grid">
                <div>
                  <span>Spend</span>
                  <strong>
                    {formatCompact(active.spend)}
                  </strong>
                </div>

                <div>
                  <span>ROAS</span>
                  <strong>{active.roas}x</strong>
                </div>

                <div>
                  <span>Conversions</span>
                  <strong>{active.conversions}</strong>
                </div>

                <div>
                <span>vs previous week</span>
                  <strong className="tooltip-positive">
                    +{percentageChange.toFixed(1)}%
                  </strong>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="chart-labels">
        {data.map((item, index) => (
          <button
            key={item.label}
            className={
              activePoint === index
                ? "active-chart-label"
                : ""
            }
            onMouseEnter={() => setActivePoint(index)}
            onClick={() => setActivePoint(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function PerformanceBars({
  weeks,
}: {
weeks: DashboardWeek[];
}) {
  const [activeBar, setActiveBar] =
    useState<number | null>(null);

const maxRoas = Math.max(
  ...weeks.map((item) => item.roas),
  1
);

const data = weeks.map((item) => ({
  label: item.week,
  value: Math.round((item.roas / maxRoas) * 100),
  roas: item.roas,
  conversions: item.conversions,
}));
  const active =
    activeBar !== null ? data[activeBar] : null;

  return (
    <div className="bars">
      <div className="bars-heading">
        <span>Weekly efficiency</span>

        <span className="bars-trend">
          <ArrowUpRight size={12} />
          Improving
        </span>
      </div>

      <div className="bars-list">
        {data.map((item, index) => {
          const selected = activeBar === index;

          return (
            <motion.div
              className={`bar-row ${
                selected ? "bar-active" : ""
              }`}
              key={item.label}
              onMouseEnter={() => setActiveBar(index)}
              onMouseLeave={() => setActiveBar(null)}
              onClick={() =>
                setActiveBar(
                  selected ? null : index
                )
              }
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45 + index * 0.1,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="bar-label">
                <span>{item.label}</span>

                <motion.strong
                  animate={{
                    scale: selected ? 1.08 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 22,
                  }}
                >
                  {item.value}%
                </motion.strong>
              </div>

              <div className="bar-track">
                <motion.div
                  className="bar-fill"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${item.value}%`,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.25 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.div
                    className="bar-shine"
                    animate={{
                      opacity: selected ? 1 : 0,
                    }}
                  />
                </motion.div>
              </div>

              <AnimatePresence>
                {selected && (
                  <motion.div
                    className="bar-tooltip"
                    initial={{
                      opacity: 0,
                      scale: 0.85,
                      y: 6,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      y: 4,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 27,
                    }}
                  >
                    <div>
                      <span>ROAS</span>
                      <strong>{item.roas}</strong>
                    </div>

                    <div>
                      <span>Conversions</span>
                      <strong>{item.conversions}</strong>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {active && (
        <motion.div
          className="selected-performance"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>{active.label}</span>

          <strong>{active.roas} ROAS</strong>

          <span>
            {active.conversions} conversions
          </span>
        </motion.div>
      )}
    </div>
  );
}


function MonthIntelligence({
  weeks,
  monthReport,
  monthName,
}: {
  weeks: DashboardWeek[];
  monthReport: DashboardMonth | null;
  monthName: string;
}) {
  const monthKey = monthReport?.monthStart.slice(0, 7) || "";

  const monthWeeks = weeks.filter(
    (week) => week.week.split(" – ")[0].slice(0, 7) === monthKey
  );

  if (!monthReport || !monthWeeks.length) return null;

  const bestRevenueWeek = monthWeeks.reduce((best, week) =>
    week.revenue > best.revenue ? week : best
  );

  const bestRoasWeek = monthWeeks.reduce((best, week) =>
    week.roas > best.roas ? week : best
  );

  const latestMonthWeek = monthWeeks[monthWeeks.length - 1];
  const previousMonthWeek = monthWeeks[monthWeeks.length - 2];

  const weeklyRevenueChange = previousMonthWeek
    ? ((latestMonthWeek.revenue - previousMonthWeek.revenue) /
        (previousMonthWeek.revenue || 1)) *
      100
    : 0;

  const revenueShare = monthReport.revenue > 0
    ? (bestRevenueWeek.revenue / monthReport.revenue) * 100
    : 0;

  const reportedAverage =
    monthWeeks.length > 0
      ? monthReport.revenue / monthWeeks.length
      : monthReport.revenue;

  const maxRevenue = Math.max(
    ...monthWeeks.map((week) => week.revenue),
    1
  );

  return (
    <motion.section
      className="month-intelligence"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="month-intelligence-glow" />

      <div className="month-intelligence-header">
        <div>
          <div className="month-intelligence-kicker">
            <Sparkles size={12} />
            MOMENTUM INTELLIGENCE
          </div>
          <h2>What the numbers are telling you</h2>
          <p>
            A quick read on {monthName} using the weekly and monthly reports already in your portal.
          </p>
        </div>

        <div className="month-intelligence-live">
          <span className="month-intelligence-live-dot" />
          LIVE REPORTING VIEW
        </div>
      </div>

      <div className="month-intelligence-grid">
        <motion.div
          className="intelligence-card intelligence-card-featured"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          whileHover={{ y: -5, scale: 1.012 }}
        >
          <div className="intelligence-card-icon">
            <TrendingUp size={17} />
          </div>
          <span>STRONGEST REVENUE WEEK</span>
          <strong>{formatMoney(bestRevenueWeek.revenue)}</strong>
          <small>
            {bestRevenueWeek.week} · {revenueShare.toFixed(0)}% of the reported monthly revenue
          </small>
        </motion.div>

        <motion.div
          className="intelligence-card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          whileHover={{ y: -5, scale: 1.012 }}
        >
          <div className="intelligence-card-icon warm">
            <Zap size={17} />
          </div>
          <span>EFFICIENCY LEADER</span>
          <strong>{bestRoasWeek.roas.toFixed(2)}x</strong>
          <small>
            {bestRoasWeek.week} · highest reported weekly ROAS
          </small>
        </motion.div>

        <motion.div
          className="intelligence-card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.22, duration: 0.5 }}
          whileHover={{ y: -5, scale: 1.012 }}
        >
          <div className="intelligence-card-icon cool">
            <Activity size={17} />
          </div>
          <span>LATEST WEEK MOMENTUM</span>
          <strong className={weeklyRevenueChange >= 0 ? "intelligence-positive" : "intelligence-negative"}>
            {weeklyRevenueChange >= 0 ? "+" : ""}{weeklyRevenueChange.toFixed(1)}%
          </strong>
          <small>
            Revenue movement vs the previous reported week
          </small>
        </motion.div>
      </div>

      <div className="month-intelligence-bottom">
        <div className="intelligence-chart-panel">
          <div className="intelligence-chart-heading">
            <div>
              <span>REPORTED WEEKS</span>
              <strong>Revenue contribution</strong>
            </div>
            <small>{monthWeeks.length} {monthWeeks.length === 1 ? "week" : "weeks"}</small>
          </div>

          <div className="intelligence-bars">
            {monthWeeks.map((week, index) => {
              const width = (week.revenue / maxRevenue) * 100;
              const share = monthReport.revenue > 0
                ? (week.revenue / monthReport.revenue) * 100
                : 0;

              return (
                <motion.div
                  className="intelligence-bar-row"
                  key={week.week}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.12 + index * 0.06, duration: 0.42 }}
                >
                  <div className="intelligence-bar-meta">
                    <span>{week.week}</span>
                    <strong>{formatMoney(week.revenue)}</strong>
                  </div>
                  <div className="intelligence-bar-track">
                    <motion.div
                      className="intelligence-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${width}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.18 + index * 0.06, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="intelligence-share">{share.toFixed(0)}%</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="intelligence-average-panel"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.25, duration: 0.55 }}
        >
          <div className="intelligence-average-icon">
            <CalendarDaysIcon />
          </div>
          <span>REPORTED-WEEK AVERAGE</span>
          <strong>{formatMoney(reportedAverage)}</strong>
          <small>
            Monthly revenue divided by the number of weekly reports currently available.
          </small>
        </motion.div>
      </div>
    </motion.section>
  );
}

function CalendarDaysIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2v4M16 2v4M3 10h18" />
      <rect x="3" y="4" width="18" height="17" rx="3" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  );
}

export default function Home() {
function PerformancePulse({
  weeks,
  selectedWeekIndex,
}: {
weeks: DashboardWeek[];
  selectedWeekIndex: number;
}) {
  const current =
    weeks[selectedWeekIndex] ?? weeks[weeks.length - 1];

  const previous =
    weeks[selectedWeekIndex - 1] ?? null;

  if (!current) return null;

  const previousRevenue = previous?.revenue || current.revenue;
  const previousSpend = previous?.spend || current.spend;
  const previousConversions =
    previous?.conversions || current.conversions;

  const revenueGrowth =
    previousRevenue > 0
      ? ((current.revenue - previousRevenue) /
          previousRevenue) *
        100
      : 0;

  const spendGrowth =
    previousSpend > 0
      ? ((current.spend - previousSpend) /
          previousSpend) *
        100
      : 0;

  const conversionGrowth =
    previousConversions > 0
      ? ((current.conversions - previousConversions) /
          previousConversions) *
        100
      : 0;

  const currentCPA =
    current.conversions > 0
      ? current.spend / current.conversions
      : 0;

  const previousCPA =
    previous?.conversions
      ? previous.spend / previous.conversions
      : currentCPA;

  const cpaChange =
    previousCPA > 0
      ? ((currentCPA - previousCPA) / previousCPA) * 100
      : 0;

  const currentAOV =
    current.conversions > 0
      ? current.revenue / current.conversions
      : 0;

  const previousAOV =
    previous?.conversions
      ? previous.revenue / previous.conversions
      : currentAOV;

  const aovChange =
    previousAOV > 0
      ? ((currentAOV - previousAOV) / previousAOV) * 100
      : 0;

  const maxValue = Math.max(
    current.revenue,
    current.spend,
    current.conversions * 1000,
    1
  );

  const pulseItems = [
    {
      label: "Revenue",
      value: current.revenue,
      display: formatMoney(current.revenue),
      growth: revenueGrowth,
      width: (current.revenue / maxValue) * 100,
      className: "pulse-revenue",
    },
    {
      label: "Ad spend",
      value: current.spend,
      display: formatMoney(current.spend),
      growth: spendGrowth,
      width: (current.spend / maxValue) * 100,
      className: "pulse-spend",
    },
    {
      label: "Conversions",
      value: current.conversions,
      display: current.conversions.toLocaleString(),
      growth: conversionGrowth,
      width:
        ((current.conversions * 1000) / maxValue) * 100,
      className: "pulse-conversions",
    },
  ];

  return (
<motion.section
  className="performance-pulse"
  initial={{
    opacity: 0,
    y: 45,
    scale: 0.97,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  viewport={{
    once: true,
    amount: 0.2,
  }}
  transition={{
    duration: 0.75,
    ease: [0.22, 1, 0.36, 1],
  }}
>

      <div className="pulse-header">
        <div>
          <span className="panel-kicker">
            PERFORMANCE PULSE
          </span>

          <h2>What changed this week</h2>

          <p>
            A quick view of movement across your key
            acquisition metrics.
          </p>
        </div>

        <div className="pulse-period">
          {current.week}
        </div>
      </div>

      <div className="pulse-layout">

        <div className="pulse-chart">

          <div className="pulse-chart-grid">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="pulse-bars">
            {pulseItems.map((item, index) => (
              <div
                className="pulse-row"
                key={item.label}
              >
                <div className="pulse-row-top">

                  <div>
                    <span className="pulse-label">
                      {item.label}
                    </span>

                    <strong>
                      {item.display}
                    </strong>
                  </div>

                  <span className="pulse-growth">
                    {item.growth >= 0 ? "↗" : "↘"}{" "}
                    {Math.abs(item.growth).toFixed(1)}%
                  </span>

                </div>

                <div className="pulse-track">

                  <motion.div
                    className={`pulse-fill ${item.className}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(
                        item.width,
                        100
                      )}%`,
                    }}
                    transition={{
                      duration: 1.1,
                      delay: 0.15 + index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="pulse-metrics">

<motion.div
  className="pulse-metric-card"
  initial={{
    opacity: 0,
    y: 25,
    scale: 0.94,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  viewport={{
    once: true,
    amount: 0.5,
  }}
  transition={{
    duration: 0.55,
    delay: 0.28,
    ease: [0.22, 1, 0.36, 1],
  }}
  whileHover={{
    y: -4,
    scale: 1.015,
  }}
>
            <span>Cost per acquisition</span>

            <strong>
              ₹{currentCPA.toFixed(0)}
            </strong>

            <small
              className={
                cpaChange <= 0
                  ? "metric-good"
                  : "metric-bad"
              }
            >
              {cpaChange <= 0 ? "↓" : "↑"}{" "}
              {Math.abs(cpaChange).toFixed(1)}% vs last week
            </small>
          </motion.div>

          <motion.div
            className="pulse-metric-card"
            whileHover={{
              y: -4,
              scale: 1.015,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 22,
            }}
          >
            <span>Average order value</span>

            <strong>
              ₹{currentAOV.toFixed(0)}
            </strong>

            <small
              className={
                aovChange >= 0
                  ? "metric-good"
                  : "metric-bad"
              }
            >
              {aovChange >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(aovChange).toFixed(1)}% vs last week
            </small>
          </motion.div>

<motion.div
  className="pulse-metric-card pulse-roas-card"
  initial={{
    opacity: 0,
    y: 25,
    scale: 0.94,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  viewport={{
    once: true,
    amount: 0.5,
  }}
  transition={{
    duration: 0.55,
    delay: 0.38,
    ease: [0.22, 1, 0.36, 1],
  }}
  whileHover={{
    y: -4,
    scale: 1.015,
  }}
>
            <span>Return on ad spend</span>

            <strong>
              {current.roas.toFixed(2)}x
            </strong>

            <small>
              {current.roas > (previous?.roas || 0)
                ? "Efficiency improved"
                : "Efficiency changed"}
            </small>
          </motion.div>

        </div>

      </div>

</motion.section>
  );
}
  const supabase = createClient();

  const [activeTab, setActiveTab] =
    useState<Tab>("Dashboard");
const [mounted, setMounted] = useState(false);
const [clientOpen, setClientOpen] = useState(false);
useEffect(() => {
  setMounted(true);
}, []);
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [brandName, setBrandName] =
    useState("ZENIN");
const [contactName, setContactName] =
  useState("");

const [accountEmail, setAccountEmail] =
  useState("");

const [settingsSaving, setSettingsSaving] =
  useState(false);

const [settingsMessage, setSettingsMessage] =
  useState("");
const [loadingBrand, setLoadingBrand] = useState(true);

const [weeks, setWeeks] =
  useState<DashboardWeek[]>([]);
const [monthlyReports, setMonthlyReports] =
  useState<DashboardMonth[]>([]);
const [
  selectedWeekIndex,
  setSelectedWeekIndex,
] = useState<number | null>(null);

const [
  selectedMonthlyMonthState,
  setSelectedMonthlyMonthState,
] = useState("");
const [weekOpen, setWeekOpen] = useState(false);
const [dashboardError, setDashboardError] =
  useState("");
  useEffect(() => {
  async function loadDashboard() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

if (!user) {
  window.location.href = "/login";
  return;
}

const {
  data: profile,
  error: profileError,
} = await supabase
  .from("profiles")
  .select("role, brand_id, full_name")
  .eq("id", user.id)
  .single();

if (profileError) {
  setDashboardError(
    `Profile error: ${profileError.message}`
  );
  setLoadingBrand(false);
  return;
}

if (!profile) {
  setDashboardError("Profile not found for this user.");
  setLoadingBrand(false);
  return;
}

if (profile.role === "admin") {
  window.location.href = "/admin";
  return;
}setContactName(profile.full_name || "");
setAccountEmail(user.email || "");

if (!profile.brand_id) {
  setLoadingBrand(false);
  return;
}

    const { data: brand } = await supabase
      .from("brands")
      .select("name")
      .eq("id", profile.brand_id)
      .single();

    if (brand?.name) {
      setBrandName(brand.name);
    }

    const { data: reports, error } = await supabase
      .from("weekly_metrics")
      .select(
        "id, week_start, week_end, spend, revenue, roas, cpc, ctr, conversions, commentary"
      )
      .eq("brand_id", profile.brand_id)
      .order("week_start", { ascending: true });

if (error) {
  setDashboardError(error.message);
} else if (reports) {

const formattedWeeks = reports.map((report) => ({
  week: `${report.week_start} – ${report.week_end}`,
  spend: Number(report.spend),
  revenue: Number(report.revenue),
  roas: Number(report.roas),
  conversions: Number(report.conversions),
  cpc: Number(report.cpc),
  ctr: Number(report.ctr),
  commentary: report.commentary || "",
}));

setWeeks(formattedWeeks);
setSelectedWeekIndex(formattedWeeks.length - 1);
}
const {
  data: monthlyReportsData,
  error: monthlyError,
} = await supabase
  .from("monthly_metrics")
  .select(
    "id, month_start, spend, revenue, conversions, cpc, ctr, commentary"
  )
  .eq("brand_id", profile.brand_id)
  .order("month_start", { ascending: true });

if (monthlyError) {
  console.error(
    "Monthly metrics error:",
    monthlyError
  );
} else if (monthlyReportsData) {
  const formattedMonths =
    monthlyReportsData.map((report) => {
      const spend = Number(report.spend);
      const revenue = Number(report.revenue);

      return {
        id: report.id,
        monthStart: report.month_start,
        spend,
        revenue,
        roas: spend > 0 ? revenue / spend : 0,
        conversions: Number(report.conversions),
        cpc: Number(report.cpc),
        ctr: Number(report.ctr),
        commentary: report.commentary || "",
      };
    });

  setMonthlyReports(formattedMonths);
}
    setLoadingBrand(false);
  }

  loadDashboard();
}, []);
if (loadingBrand) {
  return (
    <main className="momentum-app">
      <div className="dashboard-skeleton">

        {/* Sidebar */}
        <aside className="skeleton-sidebar">

          <div className="skeleton-brand">
            <div className="skeleton-logo" />

            <div>
              <div className="skeleton-line skeleton-brand-name" />
              <div className="skeleton-line skeleton-brand-sub" />
            </div>
          </div>

          <div className="skeleton-client">
            <div className="skeleton-avatar" />

            <div className="skeleton-client-text">
              <div className="skeleton-line" />
              <div className="skeleton-line short" />
            </div>
          </div>

          <div className="skeleton-nav-title" />

          <div className="skeleton-nav-item active" />
          <div className="skeleton-nav-item" />
          <div className="skeleton-nav-item" />

          <div className="skeleton-sidebar-bottom">
            <div className="skeleton-nav-item" />
            <div className="skeleton-nav-item" />
            <div className="skeleton-nav-item" />
          </div>

        </aside>


        {/* Main content */}
        <main className="skeleton-main">

          {/* Header */}
          <div className="skeleton-topbar">

            <div>
              <div className="skeleton-eyebrow" />
              <div className="skeleton-title" />
              <div className="skeleton-subtitle" />
            </div>

            <div className="skeleton-profile" />

          </div>


          {/* Reporting period */}
          <div className="skeleton-period">
            <div className="skeleton-period-label" />
            <div className="skeleton-period-select" />
          </div>


          {/* KPI cards */}
          <div className="skeleton-stats">

            <div className="skeleton-stat">
              <div className="skeleton-stat-icon" />
              <div className="skeleton-small-line" />
              <div className="skeleton-value" />
              <div className="skeleton-tiny-line" />
            </div>

            <div className="skeleton-stat">
              <div className="skeleton-stat-icon" />
              <div className="skeleton-small-line" />
              <div className="skeleton-value" />
              <div className="skeleton-tiny-line" />
            </div>

            <div className="skeleton-stat">
              <div className="skeleton-stat-icon" />
              <div className="skeleton-small-line" />
              <div className="skeleton-value" />
              <div className="skeleton-tiny-line" />
            </div>

            <div className="skeleton-stat">
              <div className="skeleton-stat-icon" />
              <div className="skeleton-small-line" />
              <div className="skeleton-value" />
              <div className="skeleton-tiny-line" />
            </div>

          </div>


          {/* Main panels */}
          <div className="skeleton-dashboard-grid">

            {/* Revenue chart */}
            <div className="skeleton-panel skeleton-revenue">

              <div className="skeleton-panel-header">
                <div>
                  <div className="skeleton-small-line" />
                  <div className="skeleton-panel-title" />
                </div>

                <div className="skeleton-panel-number" />
              </div>

              <div className="skeleton-chart">

                <div className="skeleton-chart-line one" />
                <div className="skeleton-chart-line two" />
                <div className="skeleton-chart-line three" />

                <div className="skeleton-chart-area" />

              </div>

            </div>


            {/* Efficiency */}
            <div className="skeleton-panel">

              <div className="skeleton-panel-header">
                <div>
                  <div className="skeleton-small-line" />
                  <div className="skeleton-panel-title" />
                </div>

                <div className="skeleton-square" />
              </div>

              <div className="skeleton-efficiency-cards">

                <div />
                <div />

              </div>

              <div className="skeleton-bars">

                <div className="skeleton-bar">
                  <div />
                </div>

                <div className="skeleton-bar">
                  <div />
                </div>

              </div>

            </div>

          </div>


          {/* Bottom panels */}
          <div className="skeleton-bottom-grid">

            <div className="skeleton-panel skeleton-table">

              <div className="skeleton-panel-header">
                <div>
                  <div className="skeleton-small-line" />
                  <div className="skeleton-panel-title" />
                </div>
              </div>

              <div className="skeleton-table-row" />
              <div className="skeleton-table-row" />
              <div className="skeleton-table-row" />

            </div>


            <div className="skeleton-panel">

              <div className="skeleton-panel-header">
                <div>
                  <div className="skeleton-small-line" />
                  <div className="skeleton-panel-title" />
                </div>
              </div>

              <div className="skeleton-comment-avatar" />
              <div className="skeleton-comment-line" />
              <div className="skeleton-comment-line medium" />
              <div className="skeleton-comment-line short" />

            </div>

          </div>

        </main>
      </div>
    </main>
  );
}

if (!weeks.length) {
  return (
    <main className="momentum-app">
      <div className="loading-screen">
        <h2>No reports found</h2>
        <p>
          {dashboardError ||
            "No performance reports are available for this brand yet."}
        </p>
      </div>
    </main>
  );
}

const current =
  weeks[
    selectedWeekIndex ?? weeks.length - 1
  ];
const currentIndex =
  selectedWeekIndex ?? weeks.length - 1;

const previous =
  weeks[currentIndex - 1];

const latest = weeks[weeks.length - 1];

const latestPrevious =
  weeks[weeks.length - 2];

/* =========================================================
   MONTHLY METRICS
========================================================= */

/* =========================================================
   MONTHLY METRICS
========================================================= */

const monthlyMonthKeys = monthlyReports.map(
  (report) => report.monthStart.slice(0, 7)
);

const selectedMonthlyMonth =
  selectedMonthlyMonthState ||
  monthlyMonthKeys[monthlyMonthKeys.length - 1] ||
  "";

const selectedMonthlyReport =
  monthlyReports.find(
    (report) =>
      report.monthStart.slice(0, 7) ===
      selectedMonthlyMonth
  ) ||
  monthlyReports[monthlyReports.length - 1] ||
  null;

const selectedMonthlyDate =
  selectedMonthlyReport
    ? new Date(
        `${selectedMonthlyReport.monthStart}T00:00:00`
      )
    : new Date();

const monthName =
  selectedMonthlyDate.toLocaleString(
    "en-IN",
    {
      month: "long",
      year: "numeric",
    }
  );

const monthlyRevenue =
  selectedMonthlyReport?.revenue || 0;

const monthlySpend =
  selectedMonthlyReport?.spend || 0;

const monthlyConversions =
  selectedMonthlyReport?.conversions || 0;

const monthlyRoas =
  selectedMonthlyReport?.roas || 0;

const monthlyCpc =
  selectedMonthlyReport?.cpc || 0;

const monthlyCtr =
  selectedMonthlyReport?.ctr || 0;

const monthlyCommentary =
  selectedMonthlyReport?.commentary || "";
  /* =========================================================
   CURRENT WEEK MONTH SNAPSHOT
========================================================= */

const currentWeekMonthKey =
  current.week.split(" – ")[0].slice(0, 7);

const currentWeekMonthReport =
  monthlyReports.find(
    (report) =>
      report.monthStart.slice(0, 7) ===
      currentWeekMonthKey
  ) || null;

const currentWeekMonthDate =
  currentWeekMonthReport
    ? new Date(
        `${currentWeekMonthReport.monthStart}T00:00:00`
      )
    : new Date(
        `${currentWeekMonthKey}-01T00:00:00`
      );

const currentWeekMonthName =
  currentWeekMonthDate.toLocaleString(
    "en-IN",
    {
      month: "long",
      year: "numeric",
    }
  );

/* Previous month */

const previousWeekMonthDate = new Date(
  currentWeekMonthDate.getFullYear(),
  currentWeekMonthDate.getMonth() - 1,
  1
);

const previousWeekMonthKey =
  `${previousWeekMonthDate.getFullYear()}-${String(
    previousWeekMonthDate.getMonth() + 1
  ).padStart(2, "0")}`;

const previousWeekMonthReport =
  monthlyReports.find(
    (report) =>
      report.monthStart.slice(0, 7) ===
      previousWeekMonthKey
  ) || null;

/* Current month values */

const currentWeekMonthRevenue =
  currentWeekMonthReport?.revenue || 0;

const currentWeekMonthSpend =
  currentWeekMonthReport?.spend || 0;

const currentWeekMonthRoas =
  currentWeekMonthReport?.roas || 0;

const currentWeekMonthConversions =
  currentWeekMonthReport?.conversions || 0;

/* Previous month values */

const previousWeekMonthRevenue =
  previousWeekMonthReport?.revenue || 0;

const previousWeekMonthSpend =
  previousWeekMonthReport?.spend || 0;

const previousWeekMonthRoas =
  previousWeekMonthReport?.roas || 0;

const previousWeekMonthConversions =
  previousWeekMonthReport?.conversions || 0;

/* Comparison */

const monthSnapshotChange = (
  currentValue: number,
  previousValue: number
) => {
  if (!previousValue) return null;

  return (
    ((currentValue - previousValue) /
      previousValue) *
    100
  );
};

const currentMonthRevenueChange =
  monthSnapshotChange(
    currentWeekMonthRevenue,
    previousWeekMonthRevenue
  );

const currentMonthSpendChange =
  monthSnapshotChange(
    currentWeekMonthSpend,
    previousWeekMonthSpend
  );

const currentMonthRoasChange =
  monthSnapshotChange(
    currentWeekMonthRoas,
    previousWeekMonthRoas
  );

const currentMonthConversionsChange =
  monthSnapshotChange(
    currentWeekMonthConversions,
    previousWeekMonthConversions
  );
/* =========================================================
   PERFORMANCE TOTALS
========================================================= */

const performanceRevenue = weeks.reduce(
  (total, week) =>
    total + week.revenue,
  0
);

const performanceSpend = weeks.reduce(
  (total, week) =>
    total + week.spend,
  0
);

const performanceConversions =
  weeks.reduce(
    (total, week) =>
      total + week.conversions,
    0
);

const performanceRoas =
  performanceSpend > 0
    ? performanceRevenue / performanceSpend
    : 0;
const saveSettings = async () => {
  setSettingsSaving(true);
  setSettingsMessage("");

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSettingsMessage("You are not logged in.");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("brand_id")
      .eq("id", user.id)
      .single();

    if (!profile?.brand_id) {
      setSettingsMessage("Brand account not found.");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: contactName.trim(),
      })
      .eq("id", user.id);

    if (profileError) {
      throw profileError;
    }

    const { error: brandError } = await supabase
      .from("brands")
      .update({
        name: brandName.trim(),
      })
      .eq("id", profile.brand_id);

    if (brandError) {
      throw brandError;
    }

    if (accountEmail !== user.email) {
      const { error: emailError } =
        await supabase.auth.updateUser({
          email: accountEmail.trim(),
        });

      if (emailError) {
        throw emailError;
      }
    }

    setSettingsMessage(
      "Settings saved successfully."
    );
  } catch (error: any) {
    console.error(error);

    setSettingsMessage(
      error?.message || "Could not save settings."
    );
  } finally {
    setSettingsSaving(false);
  }
}; 
  const navigation = (name: Tab) => {
    setActiveTab(name);
    setMobileOpen(false);
  };
const getChange = (
  currentValue: number,
  previousValue?: number
) => {
  if (
    previousValue === undefined ||
    previousValue === null ||
    previousValue === 0
  ) {
    return "0.0%";
  }

  return `${(
    ((currentValue - previousValue) /
      previousValue) *
    100
  ).toFixed(1)}%`;
};
  return (
    <main className="momentum-app">
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`sidebar ${
          mobileOpen ? "mobile-visible" : ""
        }`}
      >
        <div className="brand">
          <div className="brand-mark">M</div>

          <div>
            <div className="brand-name">
              Momentum
            </div>

            <div className="brand-subtitle">
              Performance Portal
            </div>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

<div className="client-switcher">
  <button
    className="client-box"
    onClick={() => setClientOpen(!clientOpen)}
  >
    <div className="client-avatar">
      {brandName.charAt(0)}
    </div>

    <div className="client-info">
      <strong>{brandName}</strong>
      <span>Active client</span>
    </div>

    <ChevronDown
      size={16}
      className={clientOpen ? "client-chevron-open" : ""}
    />
  </button>

  {clientOpen && (
    <div className="client-dropdown">
      <div className="client-dropdown-label">
        CLIENT WORKSPACE
      </div>

      <button
        className="client-option active"
        onClick={() => setClientOpen(false)}
      >
        <div className="client-option-avatar">
          {brandName.charAt(0)}
        </div>

        <div>
          <strong>{brandName}</strong>
          <span>Active client</span>
        </div>

        <span className="client-check">✓</span>
      </button>

      <div className="client-dropdown-footer">
        <span>Momentum Portal</span>
        <span>v1.0</span>
      </div>
    </div>
  )}
</div>

        <div className="nav-section">
          <span className="nav-label">
            WORKSPACE
          </span>

          <nav>
            {navItems.map((item) => {
              const Icon = item.icon;
              const selected =
                activeTab === item.name;

              return (
                <button
                  key={item.name}
                  className={`nav-item ${
                    selected ? "active" : ""
                  }`}
                  onClick={() =>
                    navigation(item.name as Tab)
                  }
                >
                  {selected && (
                    <motion.div
                      className="active-pill"
                      layoutId="active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}

                  <span className="nav-icon">
                    <Icon size={18} />
                  </span>

                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

 <div className="sidebar-bottom">
<button
  className={`nav-item ${
    activeTab === "Commentary" ? "active" : ""
  }`}
  onClick={() => navigation("Commentary")}
>
{activeTab === "Commentary" && (
  <motion.div
    className="active-pill"
    layoutId="active-pill"
    transition={{
      type: "spring",
      stiffness: 420,
      damping: 32,
    }}
  />
)}

  <span className="nav-icon">
    <MessageSquare size={18} />
  </span>

  <span>Commentary</span>
</button>

  <button
    className={`nav-item ${
      activeTab === "Settings" ? "active" : ""
    }`}
    onClick={() => navigation("Settings")}
  >
  
    {activeTab === "Settings" && (
      <motion.div
        className="active-pill"
        layoutId="active-pill"
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 32,
        }}
      />
    )}

    <span className="nav-icon">
      <Settings size={18} />
    </span>

    <span>Settings</span>
  </button>

  <button
    className="nav-item logout"
    onClick={async () => {
      await supabase.auth.signOut();
      window.location.href = "/login";
    }}
  >
    <span className="nav-icon">
      <LogOut size={18} />
    </span>

    <span>Log out</span>
  </button>

  <div className="portal-version">
    Momentum <span>v1.0</span>
  </div>
</div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={21} />
          </button>

          <div>
            <div className="eyebrow">
              CLIENT PORTAL
            </div>

<h1>Good evening, {brandName}.</h1>

            <p>
              Your performance at a glance.
            </p>
          </div>

          <div className="topbar-actions">
            <div className="updated">
              <span className="live-dot" />
        {current.week}
            </div>

<div className="profile-avatar">
  {brandName.charAt(0)}
</div>
          </div>
        </header>

        <div className="week-selector week-selector-enhanced">
          <div>
            <span>REPORTING PERIOD</span>

            <strong>
  {current.week}
</strong>
          </div>

<div className="week-dropdown-wrap">
  <button
    type="button"
    className={`week-dropdown ${weekOpen ? "open" : ""}`}
    onClick={() => setWeekOpen((open) => !open)}
  >
    <span>
      {current.week}
    </span>

    <ChevronDown
      size={15}
      className="week-dropdown-chevron"
    />
  </button>

  {weekOpen && (
    <div className="week-dropdown-menu">
      {weeks.map((week, index) => {
        const selected =
          index === (selectedWeekIndex ?? weeks.length - 1);

        return (
          <button
            key={week.week}
            type="button"
            className={`week-dropdown-option ${
              selected ? "active" : ""
            }`}
            onClick={() => {
              setSelectedWeekIndex(index);
              setWeekOpen(false);
            }}
          >
            <span>
              {index === weeks.length - 1
                ? "This week"
                : week.week}
            </span>

            {selected && (
              <span className="week-dropdown-check">
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  )}
</div>
        </div>
{activeTab === "Settings" && (
  <motion.div
    key="settings"
    className="page"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <div className="eyebrow">
            ACCOUNT SETTINGS
          </div>

          <h2>Settings</h2>

          <p>
            Manage your brand and account information.
          </p>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-card-header">
          <div>
            <h3>Brand information</h3>
            <p>
              This information appears throughout your
              Momentum portal.
            </p>
          </div>
        </div>

        <div className="settings-form">
          <div className="settings-field">
            <label>Brand name</label>

            <input
              type="text"
              value={brandName}
              onChange={(e) =>
                setBrandName(e.target.value)
              }
              placeholder="Your brand name"
            />
          </div>

          <div className="settings-field">
            <label>Contact name</label>

            <input
              type="text"
              value={contactName}
              onChange={(e) =>
                setContactName(e.target.value)
              }
              placeholder="Your name"
            />
          </div>

          <div className="settings-field">
            <label>Account email</label>

            <input
              type="email"
              value={accountEmail}
              onChange={(e) =>
                setAccountEmail(e.target.value)
              }
              placeholder="you@example.com"
            />

            <span className="settings-help">
              Changing your email may require
              confirmation from Supabase.
            </span>
          </div>
        </div>

        <div className="settings-footer">
          {settingsMessage && (
            <span
              className={
                settingsMessage.includes("successfully")
                  ? "settings-success"
                  : "settings-error"
              }
            >
              {settingsMessage}
            </span>
          )}

          <button
            className="settings-save"
            onClick={saveSettings}
            disabled={settingsSaving}
          >
            {settingsSaving
              ? "Saving..."
              : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  </motion.div>
)}
{activeTab === "Commentary" && (
  <motion.div
    key="commentary"
    className="page"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.35 }}
  >
    <div className="page-heading">
      <div>
        <span className="panel-kicker">
          FROM MOMENTUM
        </span>

        <h2>Weekly commentary</h2>

        <p>
          Your Momentum team's notes on this week's performance.
        </p>
      </div>
    </div>

    <section className="performance-large">
      <motion.div
        className="panel commentary-panel"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              {current.week}
            </span>

            <h2>Performance review</h2>
          </div>

          <div className="comment-icon">
            <MessageSquare size={17} />
          </div>
        </div>

        <div className="comment-body">
          <div className="comment-author">
            <div className="author-avatar">
              M
            </div>

            <div>
              <strong>Momentum Team</strong>

              <span>{current.week}</span>
            </div>
          </div>

          <p>
            {current.commentary ||
              "Your Momentum team has not added commentary for this report yet."}
          </p>
        </div>
      </motion.div>

      <div className="performance-metrics">
        <div className="metric-box">
          <span>Revenue</span>

          <strong>
            {formatMoney(current.revenue)}
          </strong>

          <Change
            value={getChange(
              current.revenue,
              previous?.revenue
            )}
          />
        </div>

        <div className="metric-box">
          <span>Ad spend</span>

          <strong>
            {formatMoney(current.spend)}
          </strong>

          <Change
            value={getChange(
              current.spend,
              previous?.spend
            )}
          />
        </div>

        <div className="metric-box">
          <span>ROAS</span>

          <strong>
            {current.roas.toFixed(2)}x
          </strong>

          <Change
            value={getChange(
              current.roas,
              previous?.roas
            )}
          />
        </div>

        <div className="metric-box">
          <span>Conversions</span>

          <strong>
            {current.conversions.toLocaleString()}
          </strong>

          <Change
            value={getChange(
              current.conversions,
              previous?.conversions
            )}
          />
        </div>
      </div>
    </section>
  </motion.div>
)}
        {activeTab === "Dashboard" && (
<motion.div
  key="dashboard"
  className="page"
  initial={false}
  animate={{
    opacity: 1,
    y: 0,
  }}
  exit={{
    opacity: 0,
    y: -10,
  }}
  transition={{
    duration: 0.35,
  }}
>
              <section className="stats-grid">
                <StatCard
                  title="Total Spend"
                  value={formatMoney(
                    current.spend
                  )}
                change={getChange(current.spend, previous?.spend)}
                  icon={CircleDollarSign}
                  accent="#f1f5ff"
                  delay={0.04}
                />

                <StatCard
                  title="Revenue"
                  value={formatMoney(
                    current.revenue
                  )}
         change={getChange(current.revenue, previous?.revenue)}
                  icon={ShoppingBag}
                  accent="#f2f9f4"
                  delay={0.1}
                />

                <StatCard
                  title="ROAS"
                  value={`${current.roas}x`}
        change={getChange(current.roas, previous?.roas)}
                  icon={Target}
                  accent="#fff6e9"
                  delay={0.16}
                />

                <StatCard
                  title="Conversions"
                  value={current.conversions.toLocaleString()}
             change={getChange(
  current.conversions,
  previous?.conversions
)}
                  icon={Users}
                  accent="#f7f0ff"
                  delay={0.22}
                />
                {/* =====================================================
    CURRENT MONTH SNAPSHOT
===================================================== */}


</section>
<motion.section
  className="month-snapshot"
  initial={{
    opacity: 0,
    y: 16,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.24,
    duration: 0.5,
  }}
>
  <div className="month-snapshot-header">
    <div>
      <span className="panel-kicker">
        CURRENT MONTH
      </span>

      <h2>
        {currentWeekMonthName} performance
      </h2>

      <p>
        Monthly performance for the month containing your selected week.
      </p>
    </div>

    <div className="month-snapshot-period">
      <span>SELECTED WEEK</span>
      <strong>{current.week}</strong>
    </div>
  </div>

  {!currentWeekMonthReport ? (
    <div className="month-snapshot-empty">
      <strong>
        No monthly report for {currentWeekMonthName} yet.
      </strong>

      <span>
        Your Momentum team has not added the monthly report for this month.
      </span>
    </div>
  ) : (
    <div className="month-snapshot-grid">

      {/* REVENUE */}

      <div className="month-snapshot-card">
        <div className="month-snapshot-card-top">
          <span>REVENUE</span>

          {currentMonthRevenueChange !== null && (
            <span
              className={
                currentMonthRevenueChange >= 0
                  ? "month-snapshot-change good"
                  : "month-snapshot-change bad"
              }
            >
              {currentMonthRevenueChange >= 0
                ? "↗"
                : "↘"}{" "}
              {Math.abs(
                currentMonthRevenueChange
              ).toFixed(1)}
              %
            </span>
          )}
        </div>

        <strong>
          {formatMoney(
            currentWeekMonthRevenue
          )}
        </strong>

        <small>
          {previousWeekMonthReport
            ? `vs ${formatMoney(
                previousWeekMonthRevenue
              )} last month`
            : "Current month total"}
        </small>
      </div>

      {/* AD SPEND */}

      <div className="month-snapshot-card">
        <div className="month-snapshot-card-top">
          <span>AD SPEND</span>

          {currentMonthSpendChange !== null && (
            <span
              className={
                currentMonthSpendChange <= 0
                  ? "month-snapshot-change good"
                  : "month-snapshot-change bad"
              }
            >
              {currentMonthSpendChange >= 0
                ? "↗"
                : "↘"}{" "}
              {Math.abs(
                currentMonthSpendChange
              ).toFixed(1)}
              %
            </span>
          )}
        </div>

        <strong>
          {formatMoney(
            currentWeekMonthSpend
          )}
        </strong>

        <small>
          {previousWeekMonthReport
            ? `vs ${formatMoney(
                previousWeekMonthSpend
              )} last month`
            : "Current month total"}
        </small>
      </div>

      {/* ROAS */}

      <div className="month-snapshot-card">
        <div className="month-snapshot-card-top">
          <span>ROAS</span>

          {currentMonthRoasChange !== null && (
            <span
              className={
                currentMonthRoasChange >= 0
                  ? "month-snapshot-change good"
                  : "month-snapshot-change bad"
              }
            >
              {currentMonthRoasChange >= 0
                ? "↗"
                : "↘"}{" "}
              {Math.abs(
                currentMonthRoasChange
              ).toFixed(1)}
              %
            </span>
          )}
        </div>

        <strong>
          {currentWeekMonthRoas.toFixed(2)}x
        </strong>

        <small>
          {previousWeekMonthReport
            ? `vs ${previousWeekMonthRoas.toFixed(
                2
              )}x last month`
            : "Current month return"}
        </small>
      </div>

      {/* CONVERSIONS */}

      <div className="month-snapshot-card">
        <div className="month-snapshot-card-top">
          <span>CONVERSIONS</span>

          {currentMonthConversionsChange !== null && (
            <span
              className={
                currentMonthConversionsChange >= 0
                  ? "month-snapshot-change good"
                  : "month-snapshot-change bad"
              }
            >
              {currentMonthConversionsChange >= 0
                ? "↗"
                : "↘"}{" "}
              {Math.abs(
                currentMonthConversionsChange
              ).toFixed(1)}
              %
            </span>
          )}
        </div>

        <strong>
          {currentWeekMonthConversions.toLocaleString()}
        </strong>

        <small>
          {previousWeekMonthReport
            ? `vs ${previousWeekMonthConversions.toLocaleString()} last month`
            : "Current month total"}
        </small>
      </div>

    </div>
  )}
</motion.section>

<MonthIntelligence
  weeks={weeks}
  monthReport={currentWeekMonthReport}
  monthName={currentWeekMonthName}
/>

{/* =====================================================
    MONTHLY METRICS
===================================================== */}

<motion.section
  className="monthly-metrics"
  initial={{
    opacity: 0,
    y: 16,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.24,
    duration: 0.5,
  }}
>
  <div className="monthly-metrics-header">
    <div>
      <span className="panel-kicker">
        MONTHLY METRICS
      </span>

      <h2>
        {monthName} performance
      </h2>

      <p>
        Your performance across the current month.
      </p>
    </div>

<div className="monthly-month-selector">
  <select
    value={selectedMonthlyMonth}
    onChange={(event) =>
      setSelectedMonthlyMonthState(
        event.target.value
      )
    }
  >
    {monthlyMonthKeys.map((monthKey) => {
      const date = new Date(
        Number(monthKey.slice(0, 4)),
        Number(monthKey.slice(5, 7)) - 1,
        1
      );

      const label = date.toLocaleString(
        "en-IN",
        {
          month: "long",
          year: "numeric",
        }
      );

      return (
        <option
          key={monthKey}
          value={monthKey}
        >
          {label}
        </option>
      );
    })}
  </select>

  <ChevronDown
    size={12}
    className="monthly-chevron"
  />
</div>
  </div>

  <div className="monthly-metrics-grid">

    <div className="monthly-metric">
      <span>Revenue</span>

      <strong>
        {formatMoney(monthlyRevenue)}
      </strong>

      <small>
        {monthName} total
      </small>
    </div>

    <div className="monthly-metric">
      <span>Ad spend</span>

      <strong>
        {formatMoney(monthlySpend)}
      </strong>

      <small>
        {monthName} total
      </small>
    </div>

    <div className="monthly-metric">
      <span>ROAS</span>

      <strong>
        {monthlyRoas.toFixed(2)}x
      </strong>

      <small>
        monthly return
      </small>
    </div>

    <div className="monthly-metric">
      <span>Conversions</span>

      <strong>
        {monthlyConversions.toLocaleString()}
      </strong>

      <small>
        total conversions
      </small>
    </div>

  </div>
</motion.section>

<section className="dashboard-grid">
                <motion.div
                  className="panel revenue-panel"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.28,
                    duration: 0.55,
                  }}
                >
                  <div className="panel-header">
                    <div>
                      <span className="panel-kicker">
                        REVENUE TREND
                      </span>

                      <h2>
                        Revenue performance
                      </h2>
                    </div>

<div className="chart-total">
  <strong>
    {formatMoney(current.revenue)}
  </strong>

  <Change
    value={
      previous
        ? `${(
            ((current.revenue - previous.revenue) /
              previous.revenue) *
            100
          ).toFixed(1)}%`
        : "0.0%"
    }
  />
</div>
                  </div>

             <RevenueChart weeks={weeks} />
                </motion.div>

                <motion.div
                  className="panel efficiency-panel"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.34,
                    duration: 0.55,
                  }}
                >
                  <div className="panel-header">
                    <div>
                      <span className="panel-kicker">
                        EFFICIENCY
                      </span>

                      <h2>
                        Ad performance
                      </h2>
                    </div>

                    <div className="mini-icon">
                      <BarChart3 size={18} />
                    </div>
                  </div>

                  <div className="efficiency-stats">
                    <motion.div
                      whileHover={{
                        y: -4,
                        scale: 1.025,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 22,
                      }}
                    >
                      <span>CPC</span>
<strong>
  ₹{current.cpc.toFixed(2)}
</strong><Change
  value={getChange(
    current.cpc,
    previous?.cpc
  )}
/>
                    </motion.div>

                    <motion.div
                      whileHover={{
                        y: -4,
                        scale: 1.025,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 22,
                      }}
                    >
                      <span>CTR</span>
<strong>
  {current.ctr.toFixed(2)}%
</strong>

<Change
  value={getChange(
    current.ctr,
    previous?.ctr
  )}
/>
                    </motion.div>
                  </div>

<PerformanceBars weeks={weeks} />
                </motion.div>
              </section>

              <section className="bottom-grid">
                <motion.div
                  className="panel table-panel"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.4,
                    duration: 0.55,
                  }}
                >
                  <div className="panel-header">
                    <div>
                      <span className="panel-kicker">
                        HISTORY
                      </span>

                      <h2>
                        Weekly performance
                      </h2>
                    </div>

                    <button
                      className="text-button"
                      onClick={() =>
                        setActiveTab("History")
                      }
                    >
                      View all →
                    </button>
                  </div>

                  <div className="table-scroll">
                    <table>
                      <thead>
                        <tr>
                          <th>Week</th>
                          <th>Spend</th>
                          <th>Revenue</th>
                          <th>ROAS</th>
                          <th>Conversions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {weeks.map(
                          (row, index) => (
                            <motion.tr
                              key={row.week}
                              initial={{
                                opacity: 0,
                                x: -8,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                delay:
                                  0.5 +
                                  index * 0.06,
                              }}
                            >
                              <td>
                                <strong>
                                  {row.week}
                                </strong>

                                {index ===
                                  weeks.length -
                                    1 && (
                                  <span className="current-badge">
                                    CURRENT
                                  </span>
                                )}
                              </td>

                              <td>
                                {formatMoney(
                                  row.spend
                                )}
                              </td>

                              <td>
                                {formatMoney(
                                  row.revenue
                                )}
                              </td>

                              <td>
                                <strong>
                                  {row.roas}x
                                </strong>
                              </td>

                              <td>
                                {row.conversions}
                              </td>
                            </motion.tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div
                  className="panel commentary-panel"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.46,
                    duration: 0.55,
                  }}
                >
                  <div className="panel-header">
                    <div>
                      <span className="panel-kicker">
                        FROM MOMENTUM
                      </span>

                      <h2>
                        Weekly commentary
                      </h2>
                    </div>

                    <div className="comment-icon">
                      <MessageSquare size={17} />
                    </div>
                  </div>

                  <div className="comment-body">
                    <div className="comment-author">
                      <div className="author-avatar">
                        M
                      </div>

                      <div>
                        <strong>
                          Momentum Team
                        </strong>

                     <span>
  {current.week}
</span>
                      </div>
                    </div>

<p>
  {current.commentary ||
    "Your Momentum team has not added commentary for this report yet."}
</p>

                    <button className="comment-link">
                      Read full commentary →
                    </button>
                  </div>
                </motion.div>
              </section>
<PerformancePulse
  weeks={weeks}
  selectedWeekIndex={
    selectedWeekIndex ?? weeks.length - 1
  }
/>
            </motion.div>
          )}
{activeTab === "Performance" && (
  <motion.div
    key="performance"
    className="page"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.35 }}
  >
    {/* HEADER */}
    <div className="page-heading performance-heading">
      <div>
        <span className="panel-kicker">
          PERFORMANCE
        </span>

        <h2>
          Campaign performance
        </h2>

        <p>
          A complete view of your acquisition performance
          across every reported week.
        </p>
      </div>

      <div className="performance-summary-period">
        <span>REPORTING DATA</span>
        <strong>
          {weeks.length} {weeks.length === 1 ? "week" : "weeks"}
        </strong>
      </div>
    </div>


    {/* MAIN PERFORMANCE AREA */}
    <section className="performance-large">

      {/* REVENUE CHART */}
      <motion.div
        className="panel performance-revenue-panel"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.5 }}
      >
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              REVENUE
            </span>

            <h2>
              Revenue growth
            </h2>

            <p className="performance-panel-description">
              Weekly revenue generated from your reported campaigns.
            </p>
          </div>

          <div className="performance-total">
            <span>Total revenue</span>

            <strong>
              {formatMoney(performanceRevenue)}
            </strong>

            <small>
              {weeks.length} reported {weeks.length === 1 ? "week" : "weeks"}
            </small>
          </div>
        </div>

        <RevenueChart weeks={weeks} />
      </motion.div>


      {/* KPI GRID */}
      <div className="performance-metrics">

        {/* ROAS */}
        <motion.div
          className="metric-box performance-metric-primary"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.45 }}
        >
          <div className="metric-box-top">
            <span>Average ROAS</span>
            <Target size={15} />
          </div>

          <strong>
            {weeks.length
              ? (
                  weeks.reduce(
                    (sum, item) => sum + item.roas,
                    0
                  ) / weeks.length
                ).toFixed(2)
              : "0.00"}
            x
          </strong>

<Change
  value={getChange(
    current.roas,
    previous?.roas
  )}
/>

          <small>
            Average return on ad spend
          </small>
        </motion.div>


        {/* CPC */}
        <motion.div
          className="metric-box"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.19, duration: 0.45 }}
        >
          <div className="metric-box-top">
            <span>Average CPC</span>
            <CircleDollarSign size={15} />
          </div>

          <strong>
            ₹
            {weeks.length
              ? (
                  weeks.reduce(
                    (sum, item) => sum + item.cpc,
                    0
                  ) / weeks.length
                ).toFixed(2)
              : "0.00"}
          </strong>

          <Change
            value={getChange(
              weeks.length
                ? weeks.reduce(
                    (sum, item) => sum + item.cpc,
                    0
                  ) / weeks.length
                : 0,
              latestPrevious?.cpc
            )}
          />

          <small>
            Average cost per click
          </small>
        </motion.div>


        {/* CTR */}
        <motion.div
          className="metric-box"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45 }}
        >
          <div className="metric-box-top">
            <span>Average CTR</span>
            <Target size={15} />
          </div>

          <strong>
            {weeks.length
              ? (
                  weeks.reduce(
                    (sum, item) => sum + item.ctr,
                    0
                  ) / weeks.length
                ).toFixed(2)
              : "0.00"}
            %
          </strong>

          <Change
            value={getChange(
              weeks.length
                ? weeks.reduce(
                    (sum, item) => sum + item.ctr,
                    0
                  ) / weeks.length
                : 0,
              latestPrevious?.ctr
            )}
          />

          <small>
            Average click-through rate
          </small>
        </motion.div>


        {/* CONVERSIONS */}
        <motion.div
          className="metric-box"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.29, duration: 0.45 }}
        >
          <div className="metric-box-top">
            <span>Total conversions</span>
            <Users size={15} />
          </div>

          <strong>
            {performanceConversions.toLocaleString()}
          </strong>

          <Change
            value={getChange(
              performanceConversions,
              latestPrevious?.conversions
            )}
          />

          <small>
            Across all reported weeks
          </small>
        </motion.div>

      </div>
    </section>


    {/* PERFORMANCE BREAKDOWN */}
    <section className="performance-breakdown">

      {/* SPEND VS REVENUE */}
      <motion.div
        className="panel performance-breakdown-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.5 }}
      >
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              WEEKLY MOVEMENT
            </span>

            <h2>
              Spend vs revenue
            </h2>
          </div>

          <div className="breakdown-legend">
            <span>
              <i className="legend-spend" />
              Spend
            </span>

            <span>
              <i className="legend-revenue" />
              Revenue
            </span>
          </div>
        </div>

        <div className="weekly-comparison">

          {weeks.map((week, index) => {
            const max = Math.max(
              ...weeks.map((item) =>
                Math.max(item.spend, item.revenue)
              ),
              1
            );

            const spendWidth =
              (week.spend / max) * 100;

            const revenueWidth =
              (week.revenue / max) * 100;

            return (
              <div
                className="weekly-comparison-row"
                key={week.week}
              >
                <div className="weekly-comparison-label">
                  <span>
                    {week.week}
                  </span>

                  <strong>
                    {week.roas.toFixed(2)}x
                  </strong>
                </div>

                <div className="comparison-bars">

                  <div className="comparison-line">
                    <span className="comparison-value">
                      {formatMoney(week.spend)}
                    </span>

                    <div className="comparison-track">
                      <motion.div
                        className="comparison-fill spend"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${spendWidth}%`,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.15 + index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </div>

                  <div className="comparison-line">
                    <span className="comparison-value">
                      {formatMoney(week.revenue)}
                    </span>

                    <div className="comparison-track">
                      <motion.div
                        className="comparison-fill revenue"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${revenueWidth}%`,
                        }}
                        transition={{
                          duration: 0.9,
                          delay: 0.2 + index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </motion.div>


      {/* EFFICIENCY */}
      <motion.div
        className="panel performance-breakdown-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38, duration: 0.5 }}
      >
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              EFFICIENCY
            </span>

            <h2>
              Weekly ROAS
            </h2>
          </div>

          <strong className="breakdown-total">
            {performanceRoas.toFixed(2)}x
          </strong>
        </div>

        <div className="roas-list">

          {weeks.map((week, index) => {
            const maxRoas = Math.max(
              ...weeks.map((item) => item.roas),
              1
            );

            const width =
              (week.roas / maxRoas) * 100;

            return (
              <div
                className="roas-row"
                key={week.week}
              >
                <div className="roas-row-header">
                  <span>{week.week}</span>

                  <strong>
                    {week.roas.toFixed(2)}x
                  </strong>
                </div>

                <div className="roas-track">
                  <motion.div
                    className="roas-fill"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${width}%`,
                    }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>
            );
          })}

        </div>
      </motion.div>

    </section>



<motion.section
  className="performance-efficiency-grid"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.48, duration: 0.5 }}
>

  {/* CPC */}
  <div className="panel efficiency-trend-panel">

    <div className="panel-header">
      <div>
        <span className="panel-kicker">
          ACQUISITION
        </span>

        <h2>
          Cost per click
        </h2>
      </div>

      <strong className="breakdown-total">
        ₹{current.cpc.toFixed(2)}
      </strong>
    </div>

    <div className="efficiency-trend-list">

      {weeks.map((week, index) => {
        const maxCpc = Math.max(
          ...weeks.map((item) => item.cpc),
          1
        );

        const width =
          (week.cpc / maxCpc) * 100;

        return (
          <div
            className="efficiency-trend-row"
            key={week.week}
          >
            <div className="efficiency-trend-meta">
              <span>{week.week}</span>

              <strong>
                ₹{week.cpc.toFixed(2)}
              </strong>
            </div>

            <div className="efficiency-trend-track">
              <motion.div
                className="efficiency-trend-fill cpc"
                initial={{ width: 0 }}
                animate={{
                  width: `${width}%`,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        );
      })}

    </div>
  </div>


  {/* CTR */}
  <div className="panel efficiency-trend-panel">

    <div className="panel-header">
      <div>
        <span className="panel-kicker">
          ENGAGEMENT
        </span>

        <h2>
          Click-through rate
        </h2>
      </div>

      <strong className="breakdown-total">
        {current.ctr.toFixed(2)}%
      </strong>
    </div>

    <div className="efficiency-trend-list">

      {weeks.map((week, index) => {
        const maxCtr = Math.max(
          ...weeks.map((item) => item.ctr),
          1
        );

        const width =
          (week.ctr / maxCtr) * 100;

        return (
          <div
            className="efficiency-trend-row"
            key={week.week}
          >
            <div className="efficiency-trend-meta">
              <span>{week.week}</span>

              <strong>
                {week.ctr.toFixed(2)}%
              </strong>
            </div>

            <div className="efficiency-trend-track">
              <motion.div
                className="efficiency-trend-fill ctr"
                initial={{ width: 0 }}
                animate={{
                  width: `${width}%`,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        );
      })}

    </div>
  </div>

</motion.section>
    {/* CONVERSION PERFORMANCE */}
    <motion.section
      className="panel conversion-performance"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.44, duration: 0.5 }}
    >
      <div className="panel-header">
        <div>
          <span className="panel-kicker">
            CONVERSIONS
          </span>

          <h2>
            Conversion performance
          </h2>

          <p className="performance-panel-description">
            Weekly conversion volume across your reported campaigns.
          </p>
        </div>

        <div className="conversion-total">
          <span>Total</span>

          <strong>
            {performanceConversions.toLocaleString()}
          </strong>
        </div>
      </div>

      <div className="conversion-chart">

        {weeks.map((week, index) => {
          const maxConversions = Math.max(
            ...weeks.map((item) => item.conversions),
            1
          );

          const height =
            (week.conversions / maxConversions) * 100;

          return (
            <div
              className="conversion-column"
              key={week.week}
            >
              <div className="conversion-bar-wrap">
                <motion.div
                  className="conversion-bar"
                  initial={{ height: 0 }}
                  animate={{
                    height: `${height}%`,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span>
                    {week.conversions}
                  </span>
                </motion.div>
              </div>

              <small>
                {week.week}
              </small>
            </div>
          );
        })}

      </div>
    </motion.section>

  </motion.div>
)}
    {activeTab === "History" && (
  <motion.div
    key="history"
    className="page"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.35 }}
  >
    <div className="page-heading">
      <div>
        <span className="panel-kicker">
          HISTORY
        </span>

        <h2>
          Weekly performance
        </h2>

        <p>
          Review every performance report submitted for your brand.
        </p>
      </div>

      <div className="history-count">
        <span>REPORTS</span>
        <strong>{weeks.length}</strong>
      </div>
    </div>

    <section className="history-list">

      {weeks
        .slice()
        .reverse()
        .map((week, reverseIndex) => {
          const originalIndex =
            weeks.length - 1 - reverseIndex;

          const previousWeek =
            weeks[originalIndex - 1];

          return (
            <motion.div
              key={week.week}
              className="history-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reverseIndex * 0.06,
                duration: 0.4,
              }}
            >

              <div className="history-card-header">
                <div>
                  <span className="history-week-label">
                    WEEK {weeks.length - reverseIndex}
                  </span>

                  <h3>
                    {week.week}
                  </h3>
                </div>

                <div className="history-roas">
                  <span>ROAS</span>
                  <strong>
                    {week.roas.toFixed(2)}x
                  </strong>
                </div>
              </div>


              <div className="history-metrics">

                <div>
                  <span>Spend</span>
                  <strong>
                    {formatMoney(week.spend)}
                  </strong>
                </div>

                <div>
                  <span>Revenue</span>
                  <strong>
                    {formatMoney(week.revenue)}
                  </strong>
                </div>

                <div>
                  <span>Conversions</span>
                  <strong>
                    {week.conversions.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>CPC</span>
                  <strong>
                    ₹{week.cpc.toFixed(2)}
                  </strong>
                </div>

                <div>
                  <span>CTR</span>
                  <strong>
                    {week.ctr.toFixed(2)}%
                  </strong>
                </div>

              </div>


              <div className="history-footer">

                <div className="history-change-group">

                  {previousWeek ? (
                    <>
                      <span>VS PREVIOUS WEEK</span>

                      <Change
                        value={getChange(
                          week.revenue,
                          previousWeek.revenue
                        )}
                      />
                    </>
                  ) : (
                    <span>
                      FIRST REPORTED WEEK
                    </span>
                  )}

                </div>


                {week.commentary && (
                  <div className="history-commentary">
                    <span>COMMENTARY</span>

                    <p>
                      {week.commentary}
                    </p>
                  </div>
                )}

              </div>

            </motion.div>
          );
        })}

    </section>
  </motion.div>
)}
      </section>
    </main>
  );
}
