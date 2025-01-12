
export const analyzeField = (req, res) => {
    try {
      const insights = {
        soilHealth: ["Excellent", "Good", "Average", "Poor"][Math.floor(Math.random() * 4)],
        cropHealth: ["Healthy", "Moderate", "Unhealthy"][Math.floor(Math.random() * 3)],
        recommendations: [
          "Increase water supply",
          "Apply fertilizer with high nitrogen content",
          "Improve drainage in the field",
          "Add organic compost"
        ]
      };
  
      const selectedRecommendations = insights.recommendations.sort(() => 0.5 - Math.random()).slice(0, 2);
  
      res.status(200).json({
        message: "AI analysis completed successfully",
        data: {
          soilHealth: insights.soilHealth,
          cropHealth: insights.cropHealth,
          recommendations: selectedRecommendations
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Error analyzing field data", error: error.message });
    }
  };
  