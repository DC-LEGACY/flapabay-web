
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WishlistsPlaceholder: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Wishlists</CardTitle>
        <CardDescription>Save your favorite properties</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-10 text-center">
        <div className="bg-gray-100 rounded-full p-5 mb-4">
          <Heart className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="font-medium text-lg mb-2">No wishlists yet</h3>
        <p className="text-gray-500 mb-5 max-w-md">
          Save properties you love to wishlists so you can easily find them later
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-[#ffc500] hover:bg-[#e0ae00] text-black"
        >
          Explore properties
        </Button>
      </CardContent>
    </Card>
  );
};

export default WishlistsPlaceholder;
