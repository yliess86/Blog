---
title: An Activation Exploration
description: In this post, I explore the use of the newly introduced Mish activation from Diganta Misra by comparing it with older ones on standard neural architectures and datasets.
date: 2020/02/06
read: 6min
---

The field of **Deep Learning** is boiling these days. Neural Networks are changing almost every field of computer science and beyond. In their barebones live **activation functions**. A Neural Net can be seen as a composition of multiple non-linear transformations, thus enabling the approximation of every possible non-linear phenomenon. Those non-linearities are called activation functions, and their use varies with context. New ones, with new features, are introduced once in a while. In this post, I explore the use of the newly introduced [Mish] activation from [Diganta Misra] by comparing it with older ones on standard neural architectures and datasets. 

[Mish]: https://arxiv.org/pdf/1908.08681.pdf
[Diganta Misra]: https://scholar.google.com/citations?user=LwiJwNYAAAAJ&hl=en

## Activation Function

Activation functions $\sigma$ are responsible for determining neural networks' output. Each neuron from the network contains one computing its **activation**, whether it is relevant to the final prediction or not. It is acting as a **gate**. Those functions can also embed additional features such as normalization. Due to the computational cost of training Neural Networks, it needs to be efficient but also **derivable**. The **backpropagation**, the technic used to find the optimal weights based on the error, uses gradient propagation. Three types of activation can be differentiated: **step**, **linear**, and **non-linear**.

> Multiply by weights, add bias, activate!

### Step

$$
\sigma(x) = \begin{cases}
 0, & \text{ for } x < 0 \\
 1, & \text{ for } x >= 0 
\end{cases}
$$

The **Heaviside Threshold** is using one of the most common activations. Depending on the input value compared to $0$, being above or bellow, the neuron is fired. If the neuron is active, the input is $1$ else $0$. One issue of this activation function is the lack of multi-output support. It **cannot** be used for **multivariate classification** and cannot be **derived**, thus useless with backpropagation.

```python
import torch
import torch.nn as nn

class HeavysideThreshold(nn.Module):
    # Should extend torch.autograd.Function
    # and implement forward and backward instead
    def __init__(self) -> None:
        super(HeavysideThreshold, self).__init__()

    def forward(self, X: torch.Tensor) -> torch.Tensor:
        return (X >= 0).float() 
```

![Step](/posts/an-activation-exploration/heaviside_threshold.png)

### Linear

$$
\sigma(x) = Ax+B
$$

**Linear activations** output a scale version of the input. It allows the creation of **linear transformations**. **Multivariate classification** is supported. However, this activation steal **does not** suite **backpropagation**, its derivative being constant. It also anneals the use of multi-layer neural networks as it can be **collapsed** into one single and unique linear transformation layer.

```python
import torch
import torch.nn as nn

class Linear(nn.Module):
    # Should extend torch.autograd.Function
    # and implement forward and backward instead
    def __init__(self, slope: float, intercept: float) -> None:
        super(Linear, self).__init__()
        self.slope = slope
        self.intercept = intercept

    def forward(self, X: torch.Tensor) -> torch.Tensor:
        return self.slope * x + self.intercept 
```

![Linear](/posts/an-activation-exploration/linear.png)

### Non-Linear

**Non-linear** activation functions are the ones used by all modern deep learning architecture as they allow **backpropagation** on top of additional features and support **layer stacking**. In this section, I describe a list of the most used non-linearities: the **Tanh**, **Sigmoid**, and **ReLU**, as well as newly introduced ones: **Swish**, and **Mish**.

#### TanH

$$
\sigma(x) = \frac{e^{x}-e^{-x}}{e^{x}+e^{-x}}
$$

$$
\sigma(x)' = 1 - \sigma(x)^{2}
$$

The **Hyperbolic Tangent**, **TanH**, outputs values in the $[-1,1]$ range and is **not zero-centered**. Its Gradient is smooth but suffers from **vanishing/exploding gradient**.

```python
import torch
import torch.nn as nn

# nn.Tanh
class TanH(nn.Module):
    # Should extend torch.autograd.Function
    # and implement forward and backward instead
    def __init__(self) -> None:
        super(TanH, self).__init__()

    def forward(self, X: torch.Tensor) -> torch.Tensor:
        return (
            (torch.exp(X) - torch.exp(-X)) / 
            (torch.exp(X) + torch.exp(-X))
        )
```

![TanH](/posts/an-activation-exploration/tanh.png)

#### Sigmoid

$$
\sigma(x) = \frac{1}{1+e^{-x}}
$$

$$
\sigma(x)' = \sigma(x)(1 - \sigma(x))
$$

The **Sigmoid**, **Logistic**, outputs values in the $[0,1]$ range and is **not zero-centered**. Its Gradient is smooth but suffers from **vanishing/exploding gradient**.

```python
import torch
import torch.nn as nn

# nn.Sigmoid
class Sigmoid(nn.Module):
    # Should extend torch.autograd.Function
    # and implement forward and backward instead
    def __init__(self) -> None:
        super(Sigmoid, self).__init__()

    def forward(self, X: torch.Tensor) -> torch.Tensor:
        return 1 / (1 + torch.exp(-X))
```

![Sigmoid](/posts/an-activation-exploration/sigmoid.png)

#### ReLU

$$
\sigma(x) = \begin{cases}
 0, & \text{ for } x < 0 \\
 x, & \text{ for } x >= 0 
\end{cases}
$$

$$
\sigma(x)' = \begin{cases}
 0, & \text{ for } x < 0 \\
 1, & \text{ in practice for } x = 0 \\
 1, & \text{ for } x > 0 
\end{cases}
$$

The **ReLU**, **Rectified Linear Unit**, outputs values in the $[0,+\infty]$ range and allow **faster convergence** than TanH and Sigmoid. Its Gradient is smooth, but **suffers from dying ReLU** because of the zero gradient of negative inputs. Solutions to this problem have been addressed by other activations such as the **Leaky ReLU**, and the **Parametric ReLU**. They are not a perfect fix, but they try to reintroduce the slope of the negative value.

```python
import torch
import torch.nn as nn

# nn.ReLU
class ReLU(nn.Module):
    # Should extend torch.autograd.Function
    # and implement forward and backward instead
    def __init__(self) -> None:
        super(ReLU, self).__init__()

    def forward(self, X: torch.Tensor) -> torch.Tensor:
        return X.clamp(min=0)
```

![ReLU](/posts/an-activation-exploration/relu.png)

#### Swish

$$
\sigma(x) = \frac{x}{1 + e^{-x}}
$$

$$
\sigma(x)' = \frac{e^{-x}.(x + 1) + 1}{(1 + e^{-x})^{2}}
$$

The [Swish] activation function has been introduced by [Prajit Ramachandran et al.] from Google brain in 2017 as an alternative for ReLU. The function is **differentiable** and handles negative inputs without the zero gradient issue. It reintroduces the use of the **Sigmoid** activation function being $x.sigmoid(x)$, forgotten because of the **vanishing gradient problem**. They also introduced later another version of the Swish activation, the [$\beta$-Swish]. A $\beta$ parameter is multiplied to the sigmoid input. The parameter needs to be different than $0$. When it is **close to $+\infty$**, the function **resembles the ReLU** activation. Swish has shown to be leading to **better results** than its predecessor ReLU while being **less demanding in terms of computation**.

[Swish]: https://arxiv.org/pdf/1710.05941v1.pdf
[Prajit Ramachandran et al.]: https://scholar.google.com/citations?user=ktKXDuMAAAAJ&hl=en
[$\beta$-Swish]: https://arxiv.org/pdf/1710.05941.pdf

```python
import torch
import torch.nn as nn

class Swish(nn.Module):
    # Should extend torch.autograd.Function
    # and implement forward and backward instead
    def __init__(self) -> None:
        super(Swish, self).__init__()

    def forward(self, X: torch.Tensor) -> torch.Tensor:
        return X / (1 + torch.exp(-X))
```

![Swish](/posts/an-activation-exploration/swish.png)

#### Mish

$$
\begin{aligned}
    \sigma(x) & = x.tanh(ln(1 + e^{x})) \\
              & = x.tanh(softplus(x))
\end{aligned}
$$

$$
\begin{aligned}
    \omega     & = 4(x + 1) + 4e^{2x} + e^{3x} + e^{x}(4x + 6) \\
    \delta     & = 2e^{x} + e^{2x} + 2
\end{aligned}
$$

$$
\sigma(x)' = \frac{\omega e^{x}}{\delta^{2}}
$$

The [Mish] activation function was introduced by [Diganta Misra] in 2019 as an alternative for ReLU, and as an **improvement over the Swish** activation. **Mish** is **easier to implement**, **more efficient**, and propose **better performance** than ReLU and even Swish, as shown in the original paper. Finally, Mish is **$C^{\infty}$**, thus derivable and continuous an infinit number of time on its domain. They report that their function **performs better** with **deep** netowks, and **large batch sizes**. A $\beta$ version of Mish, named **$\beta$-Mish** also exists in the following form: **$\sigma(x) = x.tanh(ln((1 + e^{x})^{\beta}))$**. With a $\beta$ value of $1.5$, it outperforms the original Mish activation in some cases.

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class Mish(nn.Module):
    # Should extend torch.autograd.Function
    # and implement forward and backward instead
    def __init__(self) -> None:
        super(Mish, self).__init__()

    def forward(self, X: torch.Tensor) -> torch.Tensor:
        return X * torch.tanh(F.softplus(X))
```

![Mish](/posts/an-activation-exploration/mish.png)

The following results are reported in the [original repository]:

- [LeNet-4] on [MNIST]

|Activation Function|Accuracy|Loss|
|:------------------|-------:|---:|
|ReLU|**98.65%**|**0.368%**|
|Swish|98.42%|0.385%|
|Mish|98.64%|**0.368%**|
|$\beta$-Mish ($\beta = 1.5$)|98.45%|0.465%|

- [Inception-ResNet v2] on [CIFAR-10]

|Activation Function|Accuracy|Loss|
|:------------------|-------:|---:|
|ReLU|82.22%|5.3729%|
|Swish|84.96%|4.8955%|
|Mish|**85.21%**|**4.6409%**|
|$\beta$-Mish ($\beta = 1.5$)|84.83%|4.8412%|

- [U-Net] on [Caravan Image Masking Challenge Dataset]

|Activation Function|Training Loss|Validation Loss|
|:------------------|-------:|---:|
|ReLU|0.724%|0.578%|
|Swish|0.665%|0.639%|
|Mish|0.574%|0.554%|
|$\beta$-Mish ($\beta = 1.5$)|**0.296%**|**0.228%**|

[original repository]: https://github.com/digantamisra98/Beta-Mish
[LeNet-4]: http://yann.lecun.com/exdb/publis/pdf/lecun-01a.pdf
[MNIST]: http://yann.lecun.com/exdb/mnist/
[Inception-ResNet v2]: https://arxiv.org/pdf/1602.07261.pdf
[CIFAR-10]: https://www.cs.toronto.edu/~kriz/cifar.html
[U-Net]: https://arxiv.org/pdf/1505.04597.pdf
[Caravan Image Masking Challenge Dataset]: https://www.kaggle.com/c/carvana-image-masking-challenge

## Conclusion

The conception of deep neural architecture is quite difficult. It requires knowledge and intuition on various subjects, from the architecture module zoo (Convolution, Gated Cells, ...), to activation functions and others. The implication of the activation function choice cannot be neglected considering their impact on the final performance of the model.