<TextInput
          label="Phone number"
          value={this.state.phoneNumber}
          onChangeText={text => this.setState({ phoneNumber: text })}
          keyboardType='phone-pad'
        />
        <HelperText
          type="error"
          visible={this.isError()}
        >
          Please start with +7
        </HelperText>
        <TextInput
          label="Password"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
        />