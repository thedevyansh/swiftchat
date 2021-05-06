import * as tf from "@tensorflow/tfjs";

function loadModel(featureName, modelPath) {

  tf.loadLayersModel(modelPath).then(function (model) {
    window.INTERMODEL[featureName] = model;
    console.log(`Loading model: ${featureName}`)
  });
}

export function loadModels() {
  loadModel("tech", "../../models/tech/model.json");
  loadModel("business", "../../models/tech/model.json");
  loadModel("job", "../../models/job/model.json");
  loadModel("medical", "../../models/medical/model.json");
  loadModel("work", "../../models/work/model.json");
  loadModel("final", "../../models/final/model.json");
}
