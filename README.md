# Project-Planner-App

## ERROR:

```Error: ER_ACCESS_DENIED_ERROR: Access denied for user ''@'localhost' (using password: NO)
    at Handshake.Sequence._packetToError (D:\Mine\Projects\Project_Planner_App\backend\node_modules\mysql\lib\protocol\sequences\Sequence.js:47:14)
    at Handshake.ErrorPacket (D:\Mine\Projects\Project_Planner_App\backend\node_modules\mysql\lib\protocol\sequences\Handshake.js:123:18)
    at Protocol._parsePacket (D:\Mine\Projects\Project_Planner_App\backend\node_modules\mysql\lib\protocol\Protocol.js:291:23)
    at Parser._parsePacket (D:\Mine\Projects\Project_Planner_App\backend\node_modules\mysql\lib\protocol\Parser.js:433:10)
    at Parser.write (D:\Mine\Projects\Project_Planner_App\backend\node_modules\mysql\lib\protocol\Parser.js:43:10)
    at Protocol.write (D:\Mine\Projects\Project_Planner_App\backend\node_modules\mysql\lib\protocol\Protocol.js:38:16)
    at Socket.<anonymous> (D:\Mine\Projects\Project_Planner_App\backend\node_modules\mysql\lib\Connection.js:88:28)
    at Socket.<anonymous> (D:\Mine\Projects\Project_Planner_App\backend\node_modules\mysql\lib\Connection.js:526:10)
    at Socket.emit (node:events:390:28)
    at addChunk (node:internal/streams/readable:315:12)
    --------------------
    at Protocol._enqueue (D:\Mine\Projects\Project_Planner_App\backend\node_modules\mysql\lib\protocol\Protocol.js:144:48)
    at Protocol.handshake (D:\Mine\Projects\Project_Planner_App\backend\node_modules\mysql\lib\protocol\Protocol.js:51:23)
    at Connection.connect (D:\Mine\Projects\Project_Planner_App\backend\node_modules\mysql\lib\Connection.js:116:18)
    at Object.<anonymous> (D:\Mine\Projects\Project_Planner_App\backend\db\dbService.js:13:12)
    at Module._compile (node:internal/modules/cjs/loader:1101:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47 {
  code: 'ER_ACCESS_DENIED_ERROR',
  errno: 1045,
  sqlMessage: "Access denied for user ''@'localhost' (using password: NO)",
  sqlState: '28000',
  fatal: true
}```

This error is due to the dotenv not configured to the right path.
