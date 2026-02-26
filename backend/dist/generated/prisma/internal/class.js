"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.4.1",
    "engineVersion": "55ae170b1ced7fc6ed07a15f110549408c501bb3",
    "activeProvider": "mysql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n}\n\nenum Role {\n  ADMIN\n  EMPLOYEE\n}\n\nenum AttendanceStatus {\n  PRESENT\n  LATE\n  LEAVE\n}\n\nmodel User {\n  id        String   @id @default(uuid())\n  nip       String   @unique\n  name      String\n  email     String   @unique\n  password  String\n  role      Role     @default(EMPLOYEE)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  attendances Attendance[]\n}\n\nmodel Attendance {\n  id          String           @id @default(uuid())\n  userId      String\n  user        User             @relation(fields: [userId], references: [id])\n  checkInTime DateTime\n  photoUrl    String?\n  status      AttendanceStatus @default(PRESENT)\n  location    String?\n  createdAt   DateTime         @default(now())\n  updatedAt   DateTime         @updatedAt\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nip\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"Role\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"attendances\",\"kind\":\"object\",\"type\":\"Attendance\",\"relationName\":\"AttendanceToUser\"}],\"dbName\":null},\"Attendance\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AttendanceToUser\"},{\"name\":\"checkInTime\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"photoUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"AttendanceStatus\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"user\",\"attendances\",\"_count\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.updateOne\",\"User.updateMany\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"Attendance.findUnique\",\"Attendance.findUniqueOrThrow\",\"Attendance.findFirst\",\"Attendance.findFirstOrThrow\",\"Attendance.findMany\",\"Attendance.createOne\",\"Attendance.createMany\",\"Attendance.updateOne\",\"Attendance.updateMany\",\"Attendance.upsertOne\",\"Attendance.deleteOne\",\"Attendance.deleteMany\",\"Attendance.groupBy\",\"Attendance.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"userId\",\"checkInTime\",\"photoUrl\",\"AttendanceStatus\",\"status\",\"location\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"not\",\"lt\",\"lte\",\"gt\",\"gte\",\"contains\",\"startsWith\",\"endsWith\",\"search\",\"nip\",\"name\",\"email\",\"password\",\"Role\",\"role\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"_relevance\"]"),
    graph: "cg4cDAQAAEgAICgAAEQAMCkAAAkAECoAAEQAMCsBAAAAATJAAEcAITNAAEcAIUABAAAAAUEBAEUAIUIBAAAAAUMBAEUAIUUAAEZFIgEAAAABACAMAwAATAAgKAAASQAwKQAAAwAQKgAASQAwKwEARQAhLAEARQAhLUAARwAhLgEASgAhMAAASzAiMQEASgAhMkAARwAhM0AARwAhBAMAAGsAIC4AAE0AIDEAAE0AIFQAAGwAIAwDAABMACAoAABJADApAAADABAqAABJADArAQAAAAEsAQBFACEtQABHACEuAQBKACEwAABLMCIxAQBKACEyQABHACEzQABHACEDAAAAAwAgAQAABAAwAgAABQAgAQAAAAMAIAEAAAABACAMBAAASAAgKAAARAAwKQAACQAQKgAARAAwKwEARQAhMkAARwAhM0AARwAhQAEARQAhQQEARQAhQgEARQAhQwEARQAhRQAARkUiAgQAAGkAIFQAAGoAIAMAAAAJACABAAAKADACAAABACADAAAACQAgAQAACgAwAgAAAQAgAwAAAAkAIAEAAAoAMAIAAAEAIAkEAABoACArAQAAAAEyQAAAAAEzQAAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQAAAAFFAAAARQIBCwAADgAgCCsBAAAAATJAAAAAATNAAAAAAUABAAAAAUEBAAAAAUIBAAAAAUMBAAAAAUUAAABFAgELAAAQADAJBAAAWwAgKwEAUQAhMkAAUgAhM0AAUgAhQAEAUQAhQQEAUQAhQgEAUQAhQwEAUQAhRQAAWkUiAgAAAAEAIAsAABIAIAgrAQBRACEyQABSACEzQABSACFAAQBRACFBAQBRACFCAQBRACFDAQBRACFFAABaRSICAAAACQAgCwAAFAAgAwAAAAEAIBAAAA4AIBEAABIAIAEAAAABACABAAAACQAgAwUAAFcAIBYAAFkAIBcAAFgAIAsoAABAADApAAAaABAqAABAADArAQAyACEyQAAzACEzQAAzACFAAQAyACFBAQAyACFCAQAyACFDAQAyACFFAABBRSIDAAAACQAgAQAAGQAwFQAAGgAgAwAAAAkAIAEAAAoAMAIAAAEAIAEAAAAFACABAAAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgCQMAAFYAICsBAAAAASwBAAAAAS1AAAAAAS4BAAAAATAAAAAwAjEBAAAAATJAAAAAATNAAAAAAQELAAAiACAIKwEAAAABLAEAAAABLUAAAAABLgEAAAABMAAAADACMQEAAAABMkAAAAABM0AAAAABAQsAACQAMAkDAABVACArAQBRACEsAQBRACEtQABSACEuAQBTACEwAABUMCIxAQBTACEyQABSACEzQABSACECAAAABQAgCwAAJgAgCCsBAFEAISwBAFEAIS1AAFIAIS4BAFMAITAAAFQwIjEBAFMAITJAAFIAITNAAFIAIQIAAAADACALAAAoACADAAAABQAgEAAAIgAgEQAAJgAgAQAAAAUAIAEAAAADACAFBQAATgAgFgAAUAAgFwAATwAgLgAATQAgMQAATQAgCygAADEAMCkAAC4AECoAADEAMCsBADIAISwBADIAIS1AADMAIS4BADQAITAAADUwIjEBADQAITJAADMAITNAADMAIQMAAAADACABAAAtADAVAAAuACADAAAAAwAgAQAABAAwAgAABQAgCygAADEAMCkAAC4AECoAADEAMCsBADIAISwBADIAIS1AADMAIS4BADQAITAAADUwIjEBADQAITJAADMAITNAADMAIQ8FAAA3ACAWAAA_ACAXAAA_ACA0AQAAAAE1AQAAAAQ2AQAAAAQ3AQA-ACE4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQAAAAELBQAANwAgFgAAPQAgFwAAPQAgNEAAAAABNUAAAAAENkAAAAAEN0AAPAAhOEAAAAABOUAAAAABOkAAAAABO0AAAAABDwUAADoAIBYAADsAIBcAADsAIDQBAAAAATUBAAAABTYBAAAABTcBADkAITgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAAAAAQcFAAA3ACAWAAA4ACAXAAA4ACA0AAAAMAI1AAAAMAg2AAAAMAg3AAA2MCIHBQAANwAgFgAAOAAgFwAAOAAgNAAAADACNQAAADAINgAAADAINwAANjAiCDQCAAAAATUCAAAABDYCAAAABDcCADcAITgCAAAAATkCAAAAAToCAAAAATsCAAAAAQQ0AAAAMAI1AAAAMAg2AAAAMAg3AAA4MCIPBQAAOgAgFgAAOwAgFwAAOwAgNAEAAAABNQEAAAAFNgEAAAAFNwEAOQAhOAEAAAABOQEAAAABOgEAAAABOwEAAAABPAEAAAABPQEAAAABPgEAAAABPwEAAAABCDQCAAAAATUCAAAABTYCAAAABTcCADoAITgCAAAAATkCAAAAAToCAAAAATsCAAAAAQw0AQAAAAE1AQAAAAU2AQAAAAU3AQA7ACE4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQAAAAELBQAANwAgFgAAPQAgFwAAPQAgNEAAAAABNUAAAAAENkAAAAAEN0AAPAAhOEAAAAABOUAAAAABOkAAAAABO0AAAAABCDRAAAAAATVAAAAABDZAAAAABDdAAD0AIThAAAAAATlAAAAAATpAAAAAATtAAAAAAQ8FAAA3ACAWAAA_ACAXAAA_ACA0AQAAAAE1AQAAAAQ2AQAAAAQ3AQA-ACE4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQAAAAEMNAEAAAABNQEAAAAENgEAAAAENwEAPwAhOAEAAAABOQEAAAABOgEAAAABOwEAAAABPAEAAAABPQEAAAABPgEAAAABPwEAAAABCygAAEAAMCkAABoAECoAAEAAMCsBADIAITJAADMAITNAADMAIUABADIAIUEBADIAIUIBADIAIUMBADIAIUUAAEFFIgcFAAA3ACAWAABDACAXAABDACA0AAAARQI1AAAARQg2AAAARQg3AABCRSIHBQAANwAgFgAAQwAgFwAAQwAgNAAAAEUCNQAAAEUINgAAAEUINwAAQkUiBDQAAABFAjUAAABFCDYAAABFCDcAAENFIgwEAABIACAoAABEADApAAAJABAqAABEADArAQBFACEyQABHACEzQABHACFAAQBFACFBAQBFACFCAQBFACFDAQBFACFFAABGRSIMNAEAAAABNQEAAAAENgEAAAAENwEAPwAhOAEAAAABOQEAAAABOgEAAAABOwEAAAABPAEAAAABPQEAAAABPgEAAAABPwEAAAABBDQAAABFAjUAAABFCDYAAABFCDcAAENFIgg0QAAAAAE1QAAAAAQ2QAAAAAQ3QAA9ACE4QAAAAAE5QAAAAAE6QAAAAAE7QAAAAAEDRgAAAwAgRwAAAwAgSAAAAwAgDAMAAEwAICgAAEkAMCkAAAMAECoAAEkAMCsBAEUAISwBAEUAIS1AAEcAIS4BAEoAITAAAEswIjEBAEoAITJAAEcAITNAAEcAIQw0AQAAAAE1AQAAAAU2AQAAAAU3AQA7ACE4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQAAAAEENAAAADACNQAAADAINgAAADAINwAAODAiDgQAAEgAICgAAEQAMCkAAAkAECoAAEQAMCsBAEUAITJAAEcAITNAAEcAIUABAEUAIUEBAEUAIUIBAEUAIUMBAEUAIUUAAEZFIkkAAAkAIEoAAAkAIAAAAAABTgEAAAABAU5AAAAAAQFOAQAAAAEBTgAAADACBRAAAG4AIBEAAHEAIEsAAG8AIEwAAHAAIFEAAAEAIAMQAABuACBLAABvACBRAAABACAAAAABTgAAAEUCCxAAAFwAMBEAAGEAMEsAAF0AMEwAAF4AME0AAF8AIE4AAGAAME8AAGAAMFAAAGAAMFEAAGAAMFIAAGIAMFMAAGMAMAcrAQAAAAEtQAAAAAEuAQAAAAEwAAAAMAIxAQAAAAEyQAAAAAEzQAAAAAECAAAABQAgEAAAZwAgAwAAAAUAIBAAAGcAIBEAAGYAIAELAABtADAMAwAATAAgKAAASQAwKQAAAwAQKgAASQAwKwEAAAABLAEARQAhLUAARwAhLgEASgAhMAAASzAiMQEASgAhMkAARwAhM0AARwAhAgAAAAUAIAsAAGYAIAIAAABkACALAABlACALKAAAYwAwKQAAZAAQKgAAYwAwKwEARQAhLAEARQAhLUAARwAhLgEASgAhMAAASzAiMQEASgAhMkAARwAhM0AARwAhCygAAGMAMCkAAGQAECoAAGMAMCsBAEUAISwBAEUAIS1AAEcAIS4BAEoAITAAAEswIjEBAEoAITJAAEcAITNAAEcAIQcrAQBRACEtQABSACEuAQBTACEwAABUMCIxAQBTACEyQABSACEzQABSACEHKwEAUQAhLUAAUgAhLgEAUwAhMAAAVDAiMQEAUwAhMkAAUgAhM0AAUgAhBysBAAAAAS1AAAAAAS4BAAAAATAAAAAwAjEBAAAAATJAAAAAATNAAAAAAQQQAABcADBLAABdADBNAABfACBRAABgADAAAT8BAAAAAQIEAABpACBUAABqACABPwEAAAABBysBAAAAAS1AAAAAAS4BAAAAATAAAAAwAjEBAAAAATJAAAAAATNAAAAAAQgrAQAAAAEyQAAAAAEzQAAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQAAAAFFAAAARQICAAAAAQAgEAAAbgAgAwAAAAkAIBAAAG4AIBEAAHIAIAoAAAAJACALAAByACArAQBRACEyQABSACEzQABSACFAAQBRACFBAQBRACFCAQBRACFDAQBRACFFAABaRSIIKwEAUQAhMkAAUgAhM0AAUgAhQAEAUQAhQQEAUQAhQgEAUQAhQwEAUQAhRQAAWkUiAgQGAgUAAwEDAAEBBAcAAAMFAAYWAAcXAAgAAAADBQAGFgAHFwAIAwUACxYADBcADQAAAAMFAAsWAAwXAA0GAgEHCAEICwEJDAEKDQEMDwENEQQOEwEPFQQSFgETFwEUGAQYGwUZHAkaHQIbHgIcHwIdIAIeIQIfIwIgJQQhJwIiKQQjKgIkKwIlLAQmLwonMA4"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.mysql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.mysql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map