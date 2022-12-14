import {
  ethers,
  Wallet,
  TypedDataDomain, TypedDataField
} from 'ethers'

const ERROR_NO_WALLET = 'ERROR_NO_WALLET'

const RPC = 'https://rpc.gnosischain.com'

export const provider = new ethers.providers.JsonRpcProvider(RPC)

class Account {
  public wallet: Wallet | null = null

  public generate() {
    this.wallet = (Wallet.createRandom()).connect(provider)
  }

  public getAddress(): Promise<string> {
    if (this.wallet === null) {
      throw new Error(ERROR_NO_WALLET)
    }

    return this.wallet.getAddress()
  }

  public signTypedData(
    domain: TypedDataDomain,
    types: Record<string, Array<TypedDataField>>,
    value: Record<string, any>
  ): Promise<string> {
    if (this.wallet === null) {
      throw new Error(ERROR_NO_WALLET)
    }

    return this.wallet._signTypedData(domain, types, value)
  }
}

export default new Account()
