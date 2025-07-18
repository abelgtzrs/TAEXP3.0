import Widget from "../ui/Widget";

const DisplayedCollection = ({ title, items, baseField }) => {
  // --- THIS IS THE FIX ---
  // We ensure that 'items' is treated as an array, even if it's undefined or null.
  // We also create a new array to avoid modifying the original.
  const displayItems = Array.isArray(items) ? [...items] : [];

  // Fill the rest of the grid with nulls for consistent spacing.
  while (displayItems.length < 6) {
    displayItems.push(null);
  }

  // Helper function to get the image URL based on collection type
  const getImageUrl = (baseItem, baseField) => {
    if (!baseItem) return null;

    // Pokemon has a complex structure with forms and sprite fields
    if (baseField === "basePokemon") {
      // Try to get sprite from the first form (default form)
      const firstForm = baseItem.forms?.[0];
      return firstForm?.spriteGen6Animated || firstForm?.spriteGen5Animated || null;
    }

    // Other collections use imageUrl directly
    return baseItem.imageUrl || null;
  };

  return (
    <Widget title={title}>
      <div className="grid grid-cols-6 gap-4">
        {displayItems.map((item, index) => {
          const baseItem = item ? item[baseField] : null;
          const imageUrl = getImageUrl(baseItem, baseField);

          return (
            <div
              key={item?._id || index}
              className="flex flex-col text-center" // Removed background, padding, and aspect-ratio. Aligned content to top.
            >
              {baseItem ? (
                <>
                  {/* Image container with a fixed aspect ratio */}
                  <div className="w-full aspect-square flex items-center justify-center">
                    {imageUrl ? (
                      <img src={imageUrl} alt={baseItem.name} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center text-xs text-gray-500">
                        [IMG]
                      </div>
                    )}
                  </div>
                  {/* Text container with fixed height to ensure alignment */}
                  <div className="mt-2 h-10 flex flex-col justify-start">
                    <p className="text-xs font-semibold text-gray-300 leading-tight whitespace-normal">
                      {baseItem.name}
                    </p>
                  </div>
                </>
              ) : (
                // Placeholder for empty slots
                <div className="w-full aspect-square flex items-center justify-center text-gray-600 text-3xl">+</div>
              )}
            </div>
          );
        })}
      </div>
    </Widget>
  );
};

export default DisplayedCollection;
