import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

export function validateInputs(route) {
  return (req, res, next) => {
    const inputs: any = [];
    let collectedErrors: any = {};
    const inpuTypes = sortArgsPosition(route.params);

    inpuTypes.forEach((element) => {
      const input = req[element.slug] ?? {};
      const plainInputsToTypes = plainToInstance(element.type, input);
      const errors = validateSync(plainInputsToTypes);
      if (errors.length > 0) {
        collectedErrors = {
          ...collectedErrors,
          [element.slug]: errors[0].constraints,
        };
      } else {
        inputs.push(input);
      }
    });
    if (Object.keys(collectedErrors).length > 0) {
      res.status(400).json({ errors: collectedErrors });
    } else {
      res.locals.inputs = inputs;
      next();
    }
  };
}

function sortArgsPosition(params) {
  return params.sort((prev, next) => prev.order - next.order);
}
