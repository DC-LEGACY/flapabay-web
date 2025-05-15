
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { PayoutMethodForm } from "./PayoutMethodForm";
import { Edit, PlusCircle, Smartphone, Banknote, CreditCard, Trash2 } from "lucide-react";
import { getCountryByCode } from "@/lib/countries";

interface PayoutMethod {
  id: number;
  type: string;
  provider: string;
  number: string;
  default: boolean;
  country?: string;
}

// Demo data
const defaultPayoutMethods: PayoutMethod[] = [
  { id: 1, type: "Mobile Money", provider: "MTN Mobile Money", number: "+233 20 123 4567", default: true, country: "GH" },
];

export const PayoutMethods = () => {
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>(defaultPayoutMethods);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentMethod, setCurrentMethod] = useState<PayoutMethod | null>(null);

  const handleAddMethod = (method: any) => {
    const newId = payoutMethods.length > 0 ? Math.max(...payoutMethods.map(m => m.id)) + 1 : 1;
    
    // Get country data
    const countryData = getCountryByCode(method.country);
    const countryFlag = countryData?.flag || "";
    
    setPayoutMethods([...payoutMethods, {
      id: newId,
      type: method.payoutMethod === "mobile-money" ? "Mobile Money" : 
            method.payoutMethod === "stripe" ? "Credit Card" : "Wire Transfer",
      provider: method.provider,
      number: method.number,
      default: payoutMethods.length === 0, // Auto-default if it's the first method
      country: method.country
    }]);
    setShowAddDialog(false);
    toast.success("Payout method added successfully", {
      description: "You will receive your earnings through this method."
    });
  };

  const handleEditMethod = (method: PayoutMethod) => {
    setCurrentMethod(method);
    setShowEditDialog(true);
  };

  const handleDeleteMethod = (method: PayoutMethod) => {
    setCurrentMethod(method);
    setShowDeleteDialog(true);
  };

  const confirmDeleteMethod = () => {
    if (!currentMethod) return;
    
    setPayoutMethods(payoutMethods.filter(m => m.id !== currentMethod.id));
    
    // If the default method is deleted, set the first remaining one as default
    if (currentMethod.default && payoutMethods.length > 1) {
      const updatedMethods = payoutMethods.filter(m => m.id !== currentMethod.id);
      if (updatedMethods.length > 0) {
        updatedMethods[0].default = true;
        setPayoutMethods(updatedMethods);
      }
    }
    
    setShowDeleteDialog(false);
    toast.success("Payout method deleted");
  };

  const handleSetDefault = (method: PayoutMethod) => {
    if (method.default) return;
    
    const updatedMethods = payoutMethods.map(m => ({
      ...m,
      default: m.id === method.id
    }));
    
    setPayoutMethods(updatedMethods);
    toast.success(`${method.provider} set as your default payout method`);
  };

  const saveEditedMethod = (updatedMethod: any) => {
    if (!currentMethod) return;
    
    const updatedMethods = payoutMethods.map(m => 
      m.id === currentMethod.id ? {
        ...m,
        provider: updatedMethod.provider,
        number: updatedMethod.number,
        country: updatedMethod.country
      } : m
    );
    
    setPayoutMethods(updatedMethods);
    setShowEditDialog(false);
    toast.success("Payout method updated successfully");
  };

  // Helper function to get the appropriate icon by method type
  const getMethodIcon = (method: PayoutMethod) => {
    switch (method.type) {
      case "Mobile Money":
        return <Smartphone className="h-8 w-8 text-[#ffc500] mr-4" />;
      case "Credit Card":
        return <CreditCard className="h-8 w-8 text-[#ffc500] mr-4" />;
      default:
        return <Banknote className="h-8 w-8 text-[#ffc500] mr-4" />;
    }
  };

  // Helper function to get country flag
  const getCountryFlag = (countryCode?: string) => {
    if (!countryCode) return "";
    const country = getCountryByCode(countryCode);
    return country ? country.flag : "";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Payout Methods</h3>
          <p className="text-sm text-muted-foreground">Manage how you receive your earnings</p>
        </div>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="bg-[#ffc500] hover:bg-amber-500 text-black"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Method
        </Button>
      </div>

      {payoutMethods.length === 0 ? (
        <Card className="border-dashed border-2 bg-muted/50">
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="font-medium mb-2">No payout methods added yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add a payout method to receive your earnings
              </p>
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="bg-[#ffc500] hover:bg-amber-500 text-black"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Payout Method
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {payoutMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                {getMethodIcon(method)}
                <div>
                  <div className="flex items-center">
                    <p className="font-medium mr-2">{method.provider}</p>
                    {method.country && (
                      <span className="text-lg" title={getCountryByCode(method.country)?.name}>
                        {getCountryFlag(method.country)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{method.number}</p>
                  {method.default && (
                    <span className="inline-flex items-center rounded-full bg-[#ffc500]/20 px-2.5 py-0.5 text-xs font-medium text-amber-800 mt-1">
                      Default
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                {!method.default && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(method)}
                    className="border-[#ffc500]/50 text-amber-700 hover:bg-[#ffc500]/10"
                  >
                    Set Default
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditMethod(method)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteMethod(method)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Payout Method</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this payout method? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={confirmDeleteMethod} className="bg-red-500 hover:bg-red-600">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Payout Method Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Payout Method</DialogTitle>
            <DialogDescription>
              Set up how you want to receive your earnings
            </DialogDescription>
          </DialogHeader>
          
          <PayoutMethodForm 
            onComplete={handleAddMethod}
            onCancel={() => setShowAddDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Payout Method Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Payout Method</DialogTitle>
            <DialogDescription>
              Update your payout method details
            </DialogDescription>
          </DialogHeader>
          
          {currentMethod && (
            <PayoutMethodForm 
              initialData={currentMethod}
              onComplete={saveEditedMethod}
              onCancel={() => setShowEditDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
