export default interface IException{
  id: number;
  service: string;
  traceId: string;
  exception: string;
  causedBy: string[],
  path: string        
}
