export declare class LogInfo {
    method: string;
    path: string;
    line: string;
    pos: string;
    file: string;
}
/**
 * 日志函数
 */
export declare function getLogInfo(): LogInfo;
export declare function qp_log(message: string, ...args: any[]): void;
