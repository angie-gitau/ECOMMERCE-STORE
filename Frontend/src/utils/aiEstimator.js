// AI Quantity Estimator Utility
// This file handles both local calculations and AI API calls

const AI_ESTIMATION_ENDPOINT = '/api/estimate-quantity'; // Replace with your actual API endpoint

export const estimateQuantityWithAI = async (materialType, inputs) => {
  try {
    // For now, we'll use local calculations
    // In the future, replace this with actual AI API call
    const response = await fetch(AI_ESTIMATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        materialType,
        inputs,
        timestamp: new Date().toISOString()
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        estimate: data.estimate,
        confidence: data.confidence || 'high',
        source: 'AI'
      };
    } else {
      // Fallback to local calculation
      return {
        success: true,
        estimate: calculateLocalEstimate(materialType, inputs),
        confidence: 'medium',
        source: 'Local'
      };
    }
  } catch (error) {
    console.log('AI API not available, using local calculation');
    // Fallback to local calculation
    return {
      success: true,
      estimate: calculateLocalEstimate(materialType, inputs),
      confidence: 'medium',
      source: 'Local'
    };
  }
};

export const calculateLocalEstimate = (materialType, inputs) => {
  const area = parseFloat(inputs.area) || 0;
  const thickness = parseFloat(inputs.thickness) || 0;
  const height = parseFloat(inputs.height) || 0;
  const length = parseFloat(inputs.length) || 0;
  const tileSize = inputs.tileSize || '30x30';

  switch (materialType) {
    case 'Concrete':
      if (area && thickness) {
        const volume = area * (thickness / 100); // Convert cm to m
        const cementBags = Math.ceil(volume * 7.5); // 7.5 bags per m³
        const sandCubicMeters = Math.ceil(volume * 0.5); // 0.5 m³ sand per m³ concrete
        const gravelCubicMeters = Math.ceil(volume * 0.8); // 0.8 m³ gravel per m³ concrete
        
        return `For ${area}m² concrete slab with ${thickness}cm thickness:
• ${cementBags} bags of cement (50kg each)
• ${sandCubicMeters} m³ of sand
• ${gravelCubicMeters} m³ of gravel/aggregate
• ${Math.ceil(volume * 180)} liters of water`;
      }
      break;

    case 'Bricks':
      if (height && length) {
        const wallArea = height * length;
        const bricksNeeded = Math.ceil(wallArea * 50); // 50 bricks per m²
        const cementBags = Math.ceil(wallArea * 0.3); // 0.3 bags per m² for mortar
        const sandCubicMeters = Math.ceil(wallArea * 0.02); // 0.02 m³ sand per m²
        
        return `For ${height}m × ${length}m brick wall:
• ${bricksNeeded} standard bricks (230×110×70mm)
• ${cementBags} bags of cement for mortar
• ${sandCubicMeters} m³ of sand for mortar`;
      }
      break;

    case 'Tiles':
      if (area) {
        const tilesNeeded = Math.ceil(area * 11); // 11 tiles per m² for 30x30cm
        const cementBags = Math.ceil(area * 0.4); // 0.4 bags per m² for tile adhesive
        const groutBags = Math.ceil(area * 0.1); // 0.1 bags per m² for grout
        
        return `For ${area}m² floor area with ${tileSize} tiles:
• ${tilesNeeded} tiles (${tileSize})
• ${cementBags} bags of tile adhesive
• ${groutBags} bags of grout
• Add 10% extra for cuts and waste`;
      }
      break;

    case 'Paint':
      if (area) {
        const paintLiters = Math.ceil(area * 0.3); // 0.3L per m² for 2 coats
        const primerLiters = Math.ceil(area * 0.15); // 0.15L per m² for primer
        
        return `For ${area}m² wall area:
• ${paintLiters} liters of paint (2 coats)
• ${primerLiters} liters of primer (1 coat)
• 2-3 paint rollers and brushes`;
      }
      break;

    case 'Steel':
      if (area) {
        const steelKg = Math.ceil(area * 120); // 120kg per m² for reinforced concrete
        const rebarPieces = Math.ceil(area * 8); // 8 pieces per m² (12mm diameter)
        
        return `For ${area}m² reinforced concrete:
• ${steelKg} kg of steel reinforcement
• ${rebarPieces} pieces of rebar (12mm × 6m)
• Binding wire and spacers`;
      }
      break;

    case 'Wood':
      if (area) {
        const woodCubicMeters = Math.ceil(area * 0.05); // 0.05 m³ per m² for framing
        const nailsKg = Math.ceil(area * 0.5); // 0.5kg nails per m²
        
        return `For ${area}m² wooden structure:
• ${woodCubicMeters} m³ of timber
• ${nailsKg} kg of nails
• Wood preservative and sealant`;
      }
      break;

    case 'Roofing':
      if (area) {
        const sheetsNeeded = Math.ceil(area * 1.1); // 1.1 sheets per m² (allowing for overlap)
        const nailsKg = Math.ceil(area * 0.3); // 0.3kg nails per m²
        
        return `For ${area}m² roof area:
• ${sheetsNeeded} roofing sheets (2.4m × 1.2m)
• ${nailsKg} kg of roofing nails
• Ridge caps and flashing`;
      }
      break;

    case 'Insulation':
      if (area) {
        const insulationRolls = Math.ceil(area / 5.5); // 5.5m² per roll
        
        return `For ${area}m² insulation area:
• ${insulationRolls} rolls of insulation (5.5m² each)
• Insulation tape and staples`;
      }
      break;

    default:
      return `For ${area}m² of ${materialType}, please consult with our experts for accurate estimation.`;
  }

  return 'Please provide all required measurements for accurate estimation.';
};

// Helper function to validate inputs
export const validateInputs = (materialType, inputs) => {
  const errors = [];

  if (!materialType) {
    errors.push('Please select a material type');
  }

  if (!inputs.area || parseFloat(inputs.area) <= 0) {
    errors.push('Please provide a valid area');
  }

  switch (materialType) {
    case 'Concrete':
      if (!inputs.thickness || parseFloat(inputs.thickness) <= 0) {
        errors.push('Please provide thickness for concrete');
      }
      break;
    case 'Bricks':
      if (!inputs.height || !inputs.length || 
          parseFloat(inputs.height) <= 0 || parseFloat(inputs.length) <= 0) {
        errors.push('Please provide wall height and length for bricks');
      }
      break;
    case 'Tiles':
      if (!inputs.tileSize) {
        errors.push('Please provide tile size');
      }
      break;
  }

  return errors;
}; 