"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/actions";
import PriceChart from "./PriceChart";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ExternalLink,
    Trash2,
    TrendingDown,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
    const [showChart, setShowChart] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Remove this product from tracking?")) return;

        setDeleting(true);
        await deleteProduct(product.id);
    };

    return (
        <Card className="hover:shadow-xl transition-all duration-300 transform bg-white/80 dark:bg-zinc-900/50 backdrop-blur-md border border-gray-200 dark:border-white/10">
            <CardHeader className="pb-3">
                <div className="flex gap-4">
                    {product.image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                        />
                    )}

                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                            {product.name}
                        </h3>

                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-orange-500">
                                {product.currency} {product.current_price}
                            </span>
                            <Badge variant="secondary" className="gap-1 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
                                <TrendingDown className="w-3 h-3" />
                                Tracking
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowChart(!showChart)}
                        className="gap-1 border-gray-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                    >
                        {showChart ? (
                            <>
                                <ChevronUp className="w-4 h-4" />
                                Hide Chart
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4" />
                                Show Chart
                            </>
                        )}
                    </Button>

                    <Button variant="outline" size="sm" asChild className="gap-1 border-gray-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white">
                        <Link href={product.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            View Product
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/30 gap-1"
                    >
                        <Trash2 className="w-4 h-4" />
                        Remove
                    </Button>
                </div>
            </CardContent>

            {showChart && (
                <CardFooter className="pt-0">
                    <PriceChart productId={product.id} />
                </CardFooter>
            )}
        </Card>
    );
}