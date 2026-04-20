"use client";

import { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { getPriceHistory } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

export default function PriceChart({ productId }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        async function loadData() {
            const history = await getPriceHistory(productId);

            const chartData = history.map((item) => ({
                date: new Date(item.checked_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                price: parseFloat(item.price),
                currency: item.currency
            }));

            setData(chartData);
            setLoading(false);
        }

        loadData();
    }, [productId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400 dark:text-zinc-500 w-full animate-pulse">
                <Loader2 className="w-6 h-6 animate-spin mb-2 text-orange-500" />
                <span className="text-sm">Loading market trends...</span>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 dark:text-zinc-500 w-full text-sm">
                No tracking history yet.<br/>
                <span className="opacity-70">Check back after the first automated price check!</span>
            </div>
        );
    }

    // Determine colors based on dynamic theme
    const isDark = theme === "dark";
    const highlightColor = "#FA5D19"; // Orange
    const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
    const textColor = isDark ? "#A1A1AA" : "#71717A";

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-3 border border-gray-100 dark:border-white/10 rounded-xl shadow-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">{label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {payload[0].payload.currency} {payload[0].value.toFixed(2)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full pt-4">
            <h4 className="text-xs font-semibold mb-6 text-gray-500 dark:text-zinc-400 uppercase tracking-widest pl-2">
                Price History
            </h4>
            <div className="h-[220px] w-full -ml-4 sm:ml-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={highlightColor} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={highlightColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid 
                            strokeDasharray="4 4" 
                            vertical={false} 
                            stroke={gridColor} 
                        />
                        <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 11, fill: textColor }} 
                            stroke="transparent"
                            tickMargin={10}
                        />
                        <YAxis 
                            domain={['dataMin - (dataMin * 0.05)', 'dataMax + (dataMax * 0.05)']} 
                            tick={{ fontSize: 11, fill: textColor }} 
                            stroke="transparent"
                            tickMargin={10}
                            tickFormatter={(value) => `$${value}`}
                            width={55}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: highlightColor, strokeWidth: 1, strokeDasharray: "4 4", fill: 'transparent' }} />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={highlightColor}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                            activeDot={{ r: 6, fill: highlightColor, stroke: isDark ? "#18181B" : "#FFF", strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}