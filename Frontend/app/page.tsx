"use client";


import { useState } from "react";

// Standard sample transactions from the dataset
const SAMPLES = {
  normal: [
    0.0, -1.3598071336738, -0.0727811733098497, 2.53634673796914, 1.37815522427443,
    -0.338320769942518, 0.462387777762292, 0.239598554061257, 0.0986979012610507,
    0.363786969611213, 0.0907941719789316, -0.551599533260813, -0.617800855762348,
    -0.991389847235408, -0.311169353699879, 1.46817697209427, -0.470400525259478,
    0.207971241929242, 0.0257905801985591, 0.403992960255733, 0.251412098239705,
    -0.018306777944153, 0.277837575558899, -0.110473910188767, 0.0669280749146731,
    0.128539358273528, -0.189114843888824, 0.133558376740387, -0.0210530534538215,
    149.62
  ],
  fraud: [
    406.0, -2.3122265423263, 1.95199201064158, -1.60985073229769, 3.9979055875468,
    -0.522187864667764, -1.42654531920595, -2.53738730624579, 1.39165724829804,
    -2.77008927719433, -2.77227214465915, 3.20203320709635, -2.89990738849473,
    -0.595221881324605, -4.28925378244217, 0.389724120274487, -1.14074717980657,
    -2.83005567450437, -0.0168224681808257, 0.416955705037907, 0.126910559061474,
    0.517232370861764, -0.0350493686052974, -0.465211076182388, 0.320198198514526,
    0.0445191674731724, 0.177839798284401, 0.261145002567677, -0.143275874698919,
    0.0
  ]
};

export default function HomePage() {
  const [features, setFeatures] = useState<string[]>(
    SAMPLES.normal.map(String)
  );
  const [result, setResult] = useState<{
    prediction: number;
    fraud_probability: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFeatureChange = (index: number, value: string) => {
    const nextFeatures = [...features];
    nextFeatures[index] = value;
    setFeatures(nextFeatures);
  };

  const loadSample = (type: "normal" | "fraud") => {
    setFeatures(SAMPLES[type].map(String));
    setResult(null);
    setError("");
  };

  const analyzeTransaction = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    // Convert values to float arrays
    const parsedFeatures = features.map((f) => parseFloat(f));
    
    // Validate inputs are valid numbers
    if (parsedFeatures.some(isNaN)) {
      setError("Please ensure all feature fields are valid numbers.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features: parsedFeatures }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to reach prediction API server.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to render label names
  const getFeatureLabel = (index: number) => {
    if (index === 0) return "Time";
    if (index === 29) return "Amount";
    return `V${index}`;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold">💸 Fraud Detection System</h1>
          <p className="text-sm text-gray-400">AI Banking Security Dashboard</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => loadSample("normal")}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm font-medium"
          >
            Load Normal Sample
          </button>
          <button
            onClick={() => loadSample("fraud")}
            className="bg-red-950 hover:bg-red-900 border border-red-800 px-4 py-2 rounded text-sm font-medium text-red-200"
          >
            Load Fraud Sample
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Inputs */}
        <div className="lg:col-span-2 bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🔍 Transaction Features (30 Inputs)
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Modify the values below and run AI prediction to evaluate transaction risk.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {features.map((val, idx) => {
              const label = getFeatureLabel(idx);
              const isNamed = label === "Time" || label === "Amount";
              return (
                <div key={idx} className={`flex flex-col ${isNamed ? "col-span-2" : ""}`}>
                  <label className="text-xs text-gray-400 font-medium mb-1">
                    {label} {isNamed && <span className="text-blue-400 font-semibold">(Key Feature)</span>}
                  </label>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    className={`p-2 rounded bg-gray-800 border ${
                      isNamed ? "border-blue-800 focus:border-blue-500" : "border-gray-700 focus:border-gray-500"
                    } text-white text-sm outline-none`}
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={analyzeTransaction}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-3 px-6 rounded transition duration-200"
          >
            {loading ? "Running AI Prediction..." : "Run AI Prediction"}
          </button>
        </div>

        {/* Right Side: Prediction Result */}
        <div className="flex flex-col gap-6">
          
          {/* Result Block */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex-1">
            <h2 className="text-xl font-bold mb-4">📊 Analysis Output</h2>
            
            {error && (
              <div className="p-4 rounded bg-red-950 border border-red-800 text-red-200 text-sm mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}

            {!result && !error && (
              <div className="h-48 flex items-center justify-center border border-dashed border-gray-800 rounded-lg text-gray-500 text-sm text-center p-4">
                Input features and press the button to inspect transaction risk status.
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className={`p-4 rounded border text-center ${
                  result.prediction === 1 
                    ? "bg-red-950/50 border-red-800 text-red-400" 
                    : "bg-green-950/50 border-green-800 text-green-400"
                }`}>
                  <div className="text-xs uppercase tracking-wider font-semibold opacity-70 mb-1">
                    Risk Decision
                  </div>
                  <div className="text-2xl font-bold">
                    {result.prediction === 1 ? "🚨 FRAUD DETECTED" : "✅ NORMAL"}
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 p-4 rounded text-center">
                  <div className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">
                    Fraud Probability
                  </div>
                  <div className="text-4xl font-extrabold text-blue-400">
                    {(result.fraud_probability * 100).toFixed(2)}%
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full mt-3 overflow-hidden">
                    <div 
                      className={`h-full ${result.prediction === 1 ? "bg-red-500" : "bg-green-500"}`}
                      style={{ width: `${result.fraud_probability * 100}%` }}
                    />
                  </div>
                </div>

                <div className="text-xs text-gray-500 leading-relaxed">
                  * Note: The AI system analyzes PCA-reduced bank transaction features. Always cross-reference high-risk alerts with user identity records.
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
