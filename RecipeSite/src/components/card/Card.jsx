import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Bookmark } from "lucide-react"
import { useState } from "react"

function RecipeCard({ Icon, heading, content }) {
    const [liked, setLiked] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)

    return (
        <Card className="w-48 flex-shrink-0 hover:shadow-lg transition-shadow">
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <div className="bg-red-100 p-3 rounded-full">
                        {Icon && <Icon className="w-8 h-8 text-red-600" />}
                    </div>
                    <div className="flex gap-2">
                        {/* Like Button */}
                        <button 
                            onClick={() => setLiked(!liked)}
                            className="hover:scale-110 transition-transform"
                        >
                            <Heart 
                                className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                            />
                        </button>
                        {/* Bookmark Button */}
                        <button 
                            onClick={() => setBookmarked(!bookmarked)}
                            className="hover:scale-110 transition-transform"
                        >
                            <Bookmark 
                                className={`w-5 h-5 ${bookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`} 
                            />
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <CardTitle className="text-lg mb-1">{heading}</CardTitle>
                <CardDescription className="text-sm">{content}</CardDescription>
            </CardContent>
        </Card>
    )
}

export default RecipeCard