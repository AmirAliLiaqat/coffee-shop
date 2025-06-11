import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function OurVision() {
  return (
    <div className="w-full py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/about">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to About
          </Button>
        </Link>

        <Card className="border-none bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-gray-900">Our Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700">
                Our vision extends beyond serving exceptional coffee. We strive to be a catalyst for positive change in our community and the coffee industry at large. We envision a future where every cup of coffee tells a story of sustainability, innovation, and human connection.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Goals</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="h-6 w-6 mr-3 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Sustainable Practices</h3>
                    <p className="text-gray-700 mt-1">
                      Implementing eco-friendly initiatives and reducing our environmental footprint through responsible sourcing and waste reduction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="h-6 w-6 mr-3 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Community Impact</h3>
                    <p className="text-gray-700 mt-1">
                      Creating meaningful connections within our community through events, workshops, and partnerships with local organizations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Check className="h-6 w-6 mr-3 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Innovation in Coffee</h3>
                    <p className="text-gray-700 mt-1">
                      Continuously exploring new brewing methods, flavor profiles, and technologies to enhance the coffee experience.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Looking Forward</h2>
              <p className="text-gray-700">
                As we look to the future, we remain committed to our core values while embracing growth and innovation. We aim to expand our reach while maintaining the intimate, community-focused atmosphere that makes our coffee shop special.
              </p>

              <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Join Our Journey</h3>
                <p className="text-gray-700">
                  We invite you to be part of our story. Whether you're a coffee enthusiast, a community member, or someone looking for a welcoming space, there's a place for you here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 