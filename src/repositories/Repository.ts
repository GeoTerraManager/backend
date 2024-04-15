// Tag interface
export default abstract class Repository<T, X> {
  protected client: T
  public abstract connect (dbName: string): Promise<X>
  public abstract disconnect (): void
};
