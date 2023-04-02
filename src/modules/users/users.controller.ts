import { Body, Get, Query } from "../../framework/common";
import { Bodydto } from "./dto/create.dto";

export class Controller {
  @Get("/ddd")
  findAll(@Body body: Bodydto, @Query query: { name: string; limit: string }) {
    console.log({ body }, "done");
    return `<div>
    <h1>${query.name}</h1>
    </div>`;
  }
  @Get("/fast")
  findOne(@Body body: { email: string }) {
    console.log(body);
    return {
      name: "mohamedata",
    };
  }
}
